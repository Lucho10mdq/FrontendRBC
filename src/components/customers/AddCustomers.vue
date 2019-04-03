<template>
<div>
  <div class="lg-gutter">
    <div class="col-12 login">
       <div class="col-sm-8 col-md-8">
        <h1>Customer</h1>
        <div class="form bg-white">
          <q-input v-model="name" type="text" stack-label="Name" />
          <q-input v-model="doc" type="text" stack-label="Doc"/>
          <q-input v-model="dir" type="text" stack-label="Adreess" />
          <q-input v-model="phone" type="text" stack-label="Phone" />
          <q-input v-model="email" type="email" placeholder="user@gmail.com" stack-label="Enter email"/>
          <q-input v-model="contact" type="text" stack-label="Contact" />
          <q-input v-model="contact_phone" type="text" stack-label="Conatact Phone" />
          <!-- <q-select v-model="locations_tables"
            multiple
            float-label="Locations"
            :filter="true"
            :options="locations_options"
            />
          <br> -->
          <br>
          <q-btn color="primary" @click="addCustomer">
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
      doc: '',
      dir: '',
      phone: '',
      email: '',
      contact: '',
      contact_phone: '',
      access: '',
      locations_options: []
    }
  },
  mounted () {
    // this.listarLocations()
  },
  methods: {
    // listarLocations () {
    //   var locationsTables = []
    //   var token = this.$store.state.login.login['token']
    //   var config = {
    //     headers: {'Authorization': 'Bearer ' + token}
    //   }
    //   const LOCATIONS_TABLES_URL = process.env.API_URL + '/locations_tables/'
    //   axios.get(LOCATIONS_TABLES_URL, config).then(response => {
    //     locationsTables = response.data.Locations_Tables
    //     this.locations_options = locationsTables.map(function (table) {
    //       return {label: table.description, value: table.id}
    //     })
    //   }).catch(e => {
    //     alert(e)
    //   })
    // },
    addCustomer () {
      var app = this
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      if ((app.name !== '') && (app.doc !== '') && (app.dir !== '') && (app.phone !== '') && (app.email !== '')) {
        const dataCustomers = {
          name: app.name,
          doc: app.doc,
          address: app.dir,
          phone: app.phone,
          email: app.email,
          contact: app.contact,
          contact_phone: app.contact_phone
        }
        const CUSTOMERS_URL = process.env.API_URL + '/customers/'
        axios.post(CUSTOMERS_URL, dataCustomers, config).then(function (response) {
          if (response.status === 200) {
            Notify.create({
              message: 'Se agrego cliente correctamente',
              type: 'positive',
              position: 'top-right'
            })
          } else {
            Notify.create({
              message: 'El cliente ya existe',
              type: 'negative'
            })
          }
        })
          .catch(e => {
            Notify.create({
              message: 'El cliente ya existe',
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
  padding-left: 35px
register-btn
  padding 20px
label
  align-items:right
</style>
