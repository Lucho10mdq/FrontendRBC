<template>
  <div>
      <q-table
      title="Lista de Ubicaciones del menu"
      :data="tableLocationsMenu"
      :columns="columns"
      :selected.sync="selectedLocation"
      selection="single"
      row-key="description"
      >
      <template slot="top-selection" slot-scope="props">
        <q-btn color="secondary" flat label="Edit" class="q-mr-sm" @click="EditLocation"/>
        <div class="col" />
      </template>
      </q-table>
  </div>
</template>

<script>
import axios from 'Axios'
import { Notify } from 'quasar'
export default {
  // name: 'ComponentName',
  data () {
    return {
       columns: [
          {
            name: 'description',
            required: true,
            label: 'Description',
            align: 'left',
            field: 'description',
            sortable: true,
            classes: 'my-class',
            style: 'width: 200px'
          }
       ],
       tableLocationsMenu: [],
       selectedLocation: []
    }
  },
  mounted () {
    this.listLocations()
  },
  methods: {
    listLocations () {
      var app = this
      app.tableLocationsMenu = []
      var locationsMenu = []
      var token = this.$store.state.login.login['token']
       var headers = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LIST_LOCATION_MENU_URL = process.env.API_URL + '/locations/'
      fetch(LIST_LOCATION_MENU_URL, headers)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          locationsMenu = data.Locations
          locationsMenu.forEach(element => {
            var Data = {
              description: element.description,
              id: element.id
            }
            this.tableLocationsMenu.push(Data)
          })
      })
    },
    EditLocation () {
      const idLocation = this.selectedLocation.map(Location => Location.id)
      console.log(idLocation)
      this.$router.push('/main/edit-location-menu/' + idLocation)
    }
  },
}
</script>

<style>
</style>
