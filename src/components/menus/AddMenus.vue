<template>
<div>
  <div class="lg-gutter">
    <div class="col-12 login">
       <div class="col-sm-8 col-md-8">
        <h1>Menu</h1>
        <div class="form bg-white">
          <div class="form-group">
            <q-input v-model="name" type="text" stack-label="Name" />
          </div>
          <div class="form-group">
            <q-input v-model="description" type="text" stack-label="Description"/>
          </div>
          <div class="form-group">
            <q-input v-model="price" type="text" stack-label="Price" />
          </div>
          <div class="form-group">
            <q-select v-model="location"
              float-label="Location"
              :filter="true"
              :options="locations_options"
              />
          </div>
          <div class="form-group">
            <q-select v-model="category"
              float-label="Category"
              :filter="true"
              :options="categories_options"
              />
          </div>
          <div class="form-group">
            <q-btn color="primary" @click="addMenu">
                Add
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { Notify } from 'quasar'
export default {
  data () {
    return {
      location: '',
      category: '',
      name: '',
      description: '',
      price: '',
      locations_options: [],
      categories_options: []
    }
  },
  mounted () {
    this.listLocations()
    this.listCategories()
  },
  methods: {
    listLocations () {
      var locations = []
      var token = this.$store.state.login.login['token']
      var headers = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LOCATIONS_URL = process.env.API_URL + '/locations/'
      fetch(LOCATIONS_URL, headers)
        .then(res => res.json())
        .then(data => {
          locations = data.Locations
          this.locations_options = locations.map(function (menu) {
            return {label: menu.description, value: menu.id}
          })
        }).catch(e => {
          alert(e)
        })
    },
    listCategories () {
      var categories = []
      var token = this.$store.state.login.login['token']
      var headers = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const CATEGORIES_URL = process.env.API_URL + '/categories/'
      fetch(CATEGORIES_URL, headers)
        .then(res => res.json())
        .then(data => {
          categories = data.Categories
          this.categories_options = categories.map(function (menu) {
            return {label: menu.description, value: menu.id}
          })
        }).catch(e => {
          alert(e)
        })
    },
    addMenu () {
      var app = this
      const token = this.$store.state.login.login['token']
      const headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
      if ((app.description === '') || (app.name === '') || (app.price === '') || (app.location === '') || (app.category === '')) {
        Notify.create({
          message: 'No pueden quedar datos vacios',
          type: 'negative'
        })
      } else {
        var dataMenu = {
          name: app.name,
          description: app.description,
          price: app.price,
          category_id: app.category,
          location_id: app.location
        }
        const MENUS_URL = process.env.API_URL + '/menus/'
        fetch(MENUS_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify(
            dataMenu
          )
        })
          .then(response => {
            if (response.status === 200) {
              app.description = ''
              Notify.create({
                message: 'the menu has been added',
                type: 'positive',
                position: 'top-right'
              })
            } else if (response.status === 422) {
              Notify.create({
                message: 'the menu already exists',
                type: 'negative'
              })
            }
            return response.json()
          }
          )
          .then(data => {
            app.name = ''
            app.description = ''
            app.price = ''
            app.category = ''
            app.location = ''
            console.log(data)
          })
          .catch(e => {
            Notify.create({
              message: 'Probles connecting',
              type: 'negative'
            })
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
