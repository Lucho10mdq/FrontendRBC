<template>
<div>
  <div class="lg-gutter">
    <div class="col-12 login">
       <div class="col-sm-8 col-md-8">
        <h1>Ubicación</h1>
        <div class="form bg-white">
          <q-input v-model="description" type="text" stack-label="Description" />
          <br>
          <q-btn color="primary" @click="addLocation">
              Agregar
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
  data () {
    return {
      description: ''
    }
  },
  methods: {
    addLocation () {
      var app = this
      const token = this.$store.state.login.login['token']
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
        var dataLocations = {
          description: app.description
        }
        const LOCATIONS_URL = process.env.API_URL + '/locations_tables/'
        fetch(LOCATIONS_URL, {
          method: 'POST',
          headers,
          body: JSON.stringify(
            dataLocations
          )
        })
          .then(response => {
            if (response.status === 200) {
              app.description = ''
              Notify.create({
                message: 'Se agrego una nueva ubicación',
                type: 'positive',
                position: 'top-right'
              })
            } else if (response.status === 422) {
              Notify.create({
                message: 'Ya se encuentra agregada esa ubicación',
                type: 'negative'
              })
            }
            return response.json()
          }
          )
          .then(data => {
            console.log(data)
          })
          .catch(e => {
            Notify.create({
              message: 'Problemas al conectar',
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
