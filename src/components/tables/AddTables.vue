<template>
<div>
  <div class="lg-gutter">
    <div class="col-12 login">
       <div class="col-sm-8 col-md-8">
        <h1>Mesa</h1>
        <div class="form bg-white">
          <q-input v-model="number" type="number" stack-label="Number" />
          <q-input v-model="capacity" type="number" stack-label="Capacity"/>
          <q-select v-model="location_table"
            float-label="Locations"
            :filter="true"
            :options="locations_options"
            />
          <br>
          <q-btn color="primary" @click="addTable">
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
      location_table: '',
      number: '',
      capacity: '',
      locations_options: [],
      tables: []
    }
  },
  mounted () {
    this.listarLocations()
    this.lastTable()
  },
  methods: {
    listarLocations () {
      var locationsTables = []
      var token = this.$store.state.login.login['token']
      var headers = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LOCATIONS_TABLES_URL = process.env.API_URL + '/locations_tables/'
      axios.get(LOCATIONS_TABLES_URL, headers).then(response => {
        locationsTables = response.data.Locations_Tables
        this.locations_options = locationsTables.map(function (table) {
          return {label: table.description, value: table.id}
        })
      }).catch(e => {
        alert(e)
      })
    },
    lastTable: function () {
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const TABLES_URL = process.env.API_URL + '/tables/'
      axios.get(TABLES_URL, config).then(response => {
        this.tables = response.data.Tables
        // const totales = array => array.reduce((acumulador, { number }) => (
        //   acumulador + number), 0)
        let last = 0
        this.tables.forEach(element => {
          if (element.number > last) {
            last = element.number
          }
        })
        this.number = last + 1
        // console.log('total ' + totales(this.tables))
      }).catch(e => {
        console.log(e)
      })
    },
    addTable () {
      var app = this
      var token = this.$store.state.login.login['token']
      console.log(token)
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      if ((app.number !== '') && (app.capacity !== '') && (app.location_table)) {
        const newTable = {
          number: app.number,
          capacity: app.capacity,
          location_table_id: app.location_table
        }
        console.log(newTable)
        const TABLES_URL = process.env.API_URL + '/tables/'
        axios.post(TABLES_URL, newTable, config).then(function (response) {
          if (response.status === 200) {
            Notify.create({
              message: 'Se agrego la nueva mesa',
              type: 'positive',
              position: 'top-right'
            })
          } else {
            Notify.create({
              message: 'Ya existe la mesa',
              type: 'negative'
            })
          }
        })
          .catch(e => {
            Notify.create({
              message: 'Ya existe la mesa',
              type: 'negative',
              position: 'top-right'
            })
          })
      } else {
        Notify.create({
          message: 'No pueden quedar datos vacios',
          type: 'negative'
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
