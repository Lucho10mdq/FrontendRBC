<template>
    <q-scroll-area class="products">
        <div>
            <div class="row" style="padding: 30px">
                <div class="col-12">
                    <q-select v-model="location_table"
                    float-label="Locations"
                    :filter="true"
                    :options="locations_options"
                    />
                </div>
            </div>
            <div class="row gutter-xs">
              <div class="col-3" v-for="table in filterTables" :key="table.id">
                  <div class="product cursor-pointer">
                  <h2>Mesa {{table.number}}</h2>
                  <h3>Capacity {{table.capacity}}</h3>
                  <br>
                  <br>
                  </div>
              </div>
            </div>
        </div>
    </q-scroll-area>
</template>
<script>
import axios from 'Axios'
import Echo from 'laravel-echo'
window.Pusher = require('pusher-js')

export default {
  data () {
    return {
      location_table: '',
      locations_options: [],
      tables: []
    }
  },
  computed: {
    filterTables: function () {
      const idLocation = this.location_table
      if (idLocation > 0) {
        return this.tables.filter(function (table) {
          return table.location_table.id === idLocation
        })
      } else {
        return this.tables
      }
    }
  },
  mounted () {
    this.listTable()
    this.listLocations()
    // var app = this
    // app.$echo.channel('orders').listen('.OrderEvent', (payload) => {
    //   console.log('Refrezcando canales')
    //   app.getChannels()
    // })
    // this.$echo.private('orders').listen('OrderEvent', (payload) => {
    //   console.log(payload)
    // })
    var token = this.$store.state.login.login['token']
    var key = process.env.KEY_ECHO
    // var config = {
    //   headers: {'Authorization': 'Bearer ' + token}
    // }
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: key,
      authEndpoint: 'http://apirbc.test/broadcasting/auth',
      auth: {
        headers: {'Authorization': 'Bearer ' + token}
      },
      cluster: 'us2',
      encrypted: true
    })
    window.Echo.private('orders').listen('OrderEvent', (payload) => {
      console.log(payload)
      console.log('pusher!!!')
    })
  },
  methods: {
    listLocations () {
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
    listTable: function () {
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const TABLES_URL = process.env.API_URL + '/tables/'
      axios.get(TABLES_URL, config).then(response => {
        this.tables = response.data.Tables
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~variables'

.products
  height 80vh
  max-height 100%
  padding 10px

.product
    background white
    border-radius 5px
    border-top 4px solid $primary
    border-left 1px solid $grey-4
    border-right 1px solid $grey-4
    border-bottom 1px solid $grey-4
    text-align center
    padding 4px
    min-height 133px
    max-height 133px

    h2
      font-size 35px
      margin 0
      padding 0
    h3
      font-size 15px
      margin 0
      padding 10px 0 0 5px
</style>
