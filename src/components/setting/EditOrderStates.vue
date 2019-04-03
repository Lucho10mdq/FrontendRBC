<template>
<div>
  <div class="lg-gutter">
    <div class="col-12 login">
       <div class="col-sm-8 col-md-8">
        <h1>Modify State Order</h1>
        <div class="form bg-white">
          <q-input v-model="description" type="text" stack-label="Description" />
          <br>
          <q-btn color="primary" @click="Modify">
              Modify
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
      description: ''
    }
  },
  mounted () {
    this.viewStateOrder()
  },
  methods: {
    Modify () {
      var app = this
      const id = this.$route.params.id
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      if (app.description !== '') {
        const dateOrderState = {
          description: app.description
        }
        const ORDERSTATE_URL = process.env.API_URL + '/orderstate/' + id
        axios.put(ORDERSTATE_URL, dateOrderState, config).then(function (response) {
          if (response.status === 200) {
            Notify.create({
              message: 'Se modifico mozo correctamente',
              type: 'positive',
              position: 'top-right'
            })
            app.$router.push('/main/list-order-plate-state/')
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
    viewStateOrder () {
      // var waiter = []
      var app = this
      const id = this.$route.params.id
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const STATEORDER_URL = process.env.API_URL + '/orderstate/' + id
      axios.get(STATEORDER_URL, config).then(function (response) {
        app.description = response.data.OrderStates.description
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
