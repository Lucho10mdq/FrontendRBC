<template>
<div>
  <div class="lg-gutter">
    <div class="col-12 login">
       <div class="col-sm-8 col-md-8">
        <h1>Add Category to Menu</h1>
        <div class="form bg-white">
          <q-input v-model="description" v-on:keyup.enter="AddCategory" type="text" stack-label="description" />
          <br>
          <q-btn color="primary" @click ='AddCategory'>
              Add
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
    // name: 'ComponentName',
    data () {
      return {
        description: ''
      }
    },
    mounted() {
      this.viewCategoryMenu()
    },
    methods: {
      AddCategory ()  {
      var app = this
      console.log(app.description)
      const token = this.$store.state.login.login['token']
      const id = this.$route.params.id
      const headers = {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
      if ((app.description === '')) {
        Notify.create({
          message: 'No pueden quedar datos vacios',
          type: 'negative'
        })
      } else {
          if( id == null) {
            var dataLocation = {
              description: app.description
            }
            const CATEGORY_MENU_URL = process.env.API_URL + '/categories/'
            fetch(CATEGORY_MENU_URL, {
              method: 'POST',
              headers,
              body: JSON.stringify(
                dataLocation
              )
            })
              .then(response => {
                console.log(response)
                if (response.status === 200) {
                  app.orderDescription = ''
                  Notify.create({
                    message: 'Se agrego una nueva categoria al menu',
                    type: 'positive',
                    position: 'top-right'
                  })
                  app.description = ''
                } else if (response.status === 422) {
                  Notify.create({
                    message: 'Ya se encuentra agregada la  categoria',
                    type: 'negative'
                  })
                }
                return response.json()
              }
              )
              .catch(e => {
                Notify.create({
                  message: 'Problemas al conectar',
                  type: 'negative'
                })
              })
          } else {
              var dataLocation = {
              description: app.description
            }
            const CATEGORY_MENU_URL = process.env.API_URL + '/categories/'+id
            fetch(CATEGORY_MENU_URL, {
              method: 'PUT',
              headers,
              body: JSON.stringify(
                dataLocation
              )
            })
              .then(response => {
                console.log(response)
                if (response.status === 200) {
                  app.orderDescription = ''
                  Notify.create({
                    message: 'Se Modifico corectamente la categoria del menu',
                    type: 'positive',
                    position: 'top-right'
                  })
                  app.description = ''
                  app.$router.push('/main/list-categories-menus/')
                } else if (response.status === 422) {
                  Notify.create({
                    message: 'Ya se encuentra agregada la  categoria',
                    type: 'negative'
                  })
                }
                return response.json()
              }
              )
              .catch(e => {
                Notify.create({
                  message: 'Problemas al conectar',
                  type: 'negative'
                })
              })
          }
      }
    },
    viewCategoryMenu () {
      // var waiter = []
      var app = this
      const id = this.$route.params.id
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const CATEGORY_MENU_URL = process.env.API_URL + '/categories/' + id
      axios.get(CATEGORY_MENU_URL, config).then(function (response) {
        app.description = response.data.Categories.description
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

