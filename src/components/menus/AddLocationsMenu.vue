<template>
<div>
  <div class="lg-gutter">
    <div class="col-12 login">
       <div class="col-sm-8 col-md-8">
        <h1>Location</h1>
        <div class="form bg-white">
          <q-input v-model="description" type="text" stack-label="Description" />
          <br>
          <q-btn color="primary" @click ='AddLoctation'>
              Add
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import { Notify } from 'quasar'
  export default {
    // name: 'ComponentName',
    data () {
      return {
        description: ''
      }
    },
    mounted() {
      this.viewLocationMenu()
    },
    methods: {
      AddLoctation ()  {
      var app = this
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
          if ( id == null) { 
              var dataLocation = {
                description: app.description
              }
              const LOCATIONS_URL = process.env.API_URL + '/locations/'
              fetch(LOCATIONS_URL, {
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
                      message: 'Se agrego una nueva ubicación',
                      type: 'positive',
                      position: 'top-right'
                    })
                    app.description = ''
                  } else if (response.status === 422) {
                    Notify.create({
                      message: 'Ya se encuentra agregado la location',
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
              const LOCATIONS_URL = process.env.API_URL + '/locations/' + id
              fetch(LOCATIONS_URL, {
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
                      message: 'Se Modifico la location',
                      type: 'positive',
                      position: 'top-right'
                    })
                      app.description = ''
                      app.$router.push('/main/list-locations-menus/')
                  } else if (response.status === 422) {
                    Notify.create({
                      message: 'Ya se encuentra agregado el estado',
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
    viewLocationMenu () {
      // var waiter = []
      var app = this
      const id = this.$route.params.id
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LOCATION_MENU_URL = process.env.API_URL + '/locations/' + id
      axios.get(LOCATION_MENU_URL, config).then(function (response) {
        app.description = response.data.Locations.description
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

