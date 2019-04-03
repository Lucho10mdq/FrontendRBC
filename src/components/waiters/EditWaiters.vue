<template>
<div>
  <div class="lg-gutter">
    <div class="col-12 login">
       <div class="col-sm-8 col-md-8">
        <h1>Modificar Mozo</h1>
        <div class="form bg-white">
          <q-input v-model="name" type="text" stack-label="Name" />
          <q-input v-model="doc" type="text" stack-label="Dni"/>
          <q-input v-model="address" type="text" stack-label="Adreess" />
          <q-input v-model="phone" type="text" stack-label="Phone" />
          <q-input v-model="email" type="email" placeholder="user@gmail.com" stack-label="Enter email"/>
          <q-input v-model="code" type="text"  stack-label="Code"/>
          <q-select v-model="locations_selected"
            multiple
            float-label="Locations"
            :filter="true"
            :options="locations_options"
            />
          <br>
          <q-btn color="primary" @click="ModifyWaiter">
              Modificar
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
      name: '',
      doc: '',
      address: '',
      phone: '',
      email: '',
      code: '',
      access: '',
      locations_options: [],
      locations_selected: []
    }
  },
  mounted () {
    this.viewWaiter()
    this.listarLocations()
  },
  methods: {
    ModifyWaiter () {
      var app = this
      const id = this.$route.params.id
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      if ((app.name !== '') && (app.dni !== '') && (app.doc !== '') && (app.phone !== '') && (app.email !== '') && (app.code !== '')) {
        const dateWaiters = {
          name: app.name,
          doc: app.doc,
          address: app.address,
          phone: app.phone,
          email: app.email,
          code: app.code,
          locations_tables: app.locations_selected
        }
        const WAITERS_URL = process.env.API_URL + '/waiters/' + id
        axios.put(WAITERS_URL, dateWaiters, config).then(function (response) {
          if (response.status === 200) {
            Notify.create({
              message: 'Se modifico mozo correctamente',
              type: 'positive',
              position: 'top-right'
            })
            app.$router.push('/main/list-waiter/')
          } else {
            Notify.create({
              message: 'Ya existe el mozo',
              type: 'negative'
            })
          }
        })
          .catch(e => {
            Notify.create({
              message: 'No se pudo modificar mozo',
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
    },
    viewWaiter () {
      // var waiter = []
      var app = this
      const id = this.$route.params.id
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const WAITERS_URL = process.env.API_URL + '/waiters/' + id
      axios.get(WAITERS_URL, config).then(function (response) {
        app.code = response.data.Waiter.code
        app.name = response.data.Waiter.people.name
        app.doc = response.data.Waiter.people.doc
        app.address = response.data.Waiter.people.address
        app.phone = response.data.Waiter.people.phone
        app.email = response.data.Waiter.people.email
        var tempLocations = response.data.Waiter.locations_tables
        tempLocations.forEach(element => {
          var loc = element.id
          app.locations_selected.push(loc)
        })
      })
    },
    listarLocations () {
      var locationsTables = []
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LOCATIONS_TABLES_URL = process.env.API_URL + '/locations_tables/'
      axios.get(LOCATIONS_TABLES_URL, config).then(response => {
        locationsTables = response.data.Locations_Tables
        locationsTables.forEach(element => {
          var loc = {
            label: element.description,
            value: element.id
          }
          this.locations_options.push(loc)
        })
      }).catch(e => {
        alert(e)
      })
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
