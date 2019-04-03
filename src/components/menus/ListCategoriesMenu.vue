<template>
  <div>
      <q-table
      title="Lista de Categorias del menu"
      :data="tableCategoryMenu"
      :selected.sync="selectedCategoryMenu"
      selection="single"
      :columns="columns"
      row-key="description"
      >
    <template slot="top-selection" slot-scope="props">
      <q-btn color="secondary" flat label="Edit" class="q-mr-sm" @click="EditCategory"/>
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
       tableCategoryMenu: [],  
       selectedCategoryMenu: []
    }
  },
  mounted () {
    this.listLocations()
  },
  methods: {
    listLocations () {
      var app = this
      app.tableCategoryMenu = []
      var CategoryMenu = []
      var token = this.$store.state.login.login['token']
       var headers = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LIST_CATEGORY_MENU_URL = process.env.API_URL + '/categories/'
      fetch(LIST_CATEGORY_MENU_URL, headers)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          CategoryMenu = data.Categories
          CategoryMenu.forEach(element => {
            var Data = {
              description: element.description,
              id: element.id
            }
            this.tableCategoryMenu.push(Data)
          })
      })
    },
    EditCategory () {
      const idCategoryMenu = this.selectedCategoryMenu.map(Categories => Categories.id)
      console.log(idCategoryMenu)
      this.$router.push('/main/edit-category-menu/' + idCategoryMenu)
    }
  }
}
</script>

<style>
</style>

