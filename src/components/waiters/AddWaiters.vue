<template>
<div>
  <div class="lg-gutter">
    <div class="col-12 login">
       <div class="col-sm-8 col-md-8">
        <h1>Mozo</h1>
        <div class="form bg-white">
          <q-input v-model="name" type="text" stack-label="Name" />
          <q-input v-model="dni" type="text" stack-label="Dni"/>
          <q-input v-model="dir" type="text" stack-label="Adreess" />
          <q-input v-model="phone" type="text" stack-label="Phone" />
          <q-input v-model="email" type="email" placeholder="user@gmail.com" stack-label="Enter email"/>
          <q-input v-model="code" type="text"  stack-label="Code"/>
          <q-select v-model="locations_tables"
            multiple
            float-label="Locations"
            :filter="true"
            :options="locations_options"
            />
          <br>
          <q-btn color="primary" @click="addWaiter">
              Agregar
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'Axios'
import { Notify } from 'quasar'
export default {
  data () {
    return {
      locations_tables: [],
      name: '',
      dni: '',
      dir: '',
      phone: '',
      email: '',
      code: '',
      access: '',
      locations_options: []
    }
  },
  mounted () {
    this.listarLocations()
  },
  methods: {
    listarLocations () {
      var locationsTables = []
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LOCATIONS_TABLES_URL = process.env.API_URL + '/locations_tables/'
      axios.get(LOCATIONS_TABLES_URL, config).then(response => {
        locationsTables = response.data.Locations_Tables
        this.locations_options = locationsTables.map(function (table) {
          return {label: table.description, value: table.id}
        })
      }).catch(e => {
        alert(e)
      })
    },
    addWaiter () {
      var app = this
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      if ((app.name !== '') && (app.dni !== '') && (app.dir !== '') && (app.phone !== '') && (app.email !== '') && (app.code !== '')) {
        const dataWaiters = {
          name: app.name,
          doc: app.dni,
          address: app.dir,
          phone: app.phone,
          email: app.email,
          code: app.code,
          locations_tables: app.locations_tables
        }
        const WAITERS_URL = process.env.API_URL + '/waiters/'
        axios.post(WAITERS_URL, dataWaiters, config).then(function (response) {
          if (response.status === 200) {
            Notify.create({
              message: 'Se agrego mozo correctamente',
              type: 'positive',
              position: 'top-right'
            })
            app.locations_tables = []
            app.name = ''
            app.dni = ''
            app.dir = ''
            app.phone = ''
            app.email = ''
            app.code = ''
            app.access = ''
            // app.locations_options = []
          } else {
            Notify.create({
              message: 'Ya existe el mozo',
              type: 'negative'
            })
          }
        })
          .catch(e => {
            Notify.create({
              message: 'El mozo ya existe',
              type: 'negative',
              position: 'top-right'
            })
          })
      } else {
        Notify.create({
          message: 'No pueden quedar datos vacios',
          type: 'negative',
          position: 'top-right'
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.q-input
    margin-bottom 10px
.q-if
  margin 0
.form
    color  blue
    border-radius 0px 0px 5px 5px
    padding 20px
    text-align: center
    justify-content: center
  h1
    color  black
    border-radius: 5px 5px 0 0
    font-size: 25px
    text-align: center
    padding: 10px
    margin: 0
.login
  display: flex
  align-items: center
  justify-content: center
.q-btn
  padding-left: 45px
register-btn
  padding 20px
label
  align-items:right
</style>
