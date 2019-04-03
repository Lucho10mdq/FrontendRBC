<template>
<div class = "container">
  <div class="row  lg-gutter fullscreen">
    <div class="col-md-6 col-xs-12 img">
        <img src="">
    </div>
    <div class="col-md-6 col-xs-12 login">
       <div class="col-12 col-sm-8 col-md-4">
        <h1>Crear cuenta</h1>
        <div class="form bg-white">
          <q-input v-model="name" type="text" stack-label="Nombre" />
          <q-input v-model="user" type="email" placeholder="user@gmail.com" stack-label="Enter email"/>
          <q-input v-model="pass" type="password" stack-label="Contraseña" />
          <q-input v-model="confirm_pass" type="password" stack-label="Confirmar Contraseña" />
          <br>
          <q-btn color="primary" @click="register">
              Registrarse
          </q-btn>
          <br>
          <q-field>{{access}}</q-field>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// import messages from 'src/i18n'
import axios from 'axios'
export default {
  // name: 'ComponentName',
  data () {
    return {
      // msg: this.$i18n.t,
      name: '',
      user: '',
      pass: '',
      confirm_pass: '',
      access: ''
      // register: this.$i18n.t('register')
      // rememberPass: this.$i18n.t('rememberPass')
    }
  },
  methods: {
    setAxiosHeaders (token) {
      var app = this
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      console.log(this.$store.state.login.login)
      app.$router.push('/main')
    },
    register ({commit}) {
      var app = this
      if (((this.name !== '') && (this.user !== '') && (this.pass !== ''))) {
        if (this.pass === this.confirm_pass) {
          const credenciales = {
            name: this.name,
            email: this.user,
            password: this.pass,
            confirm_password: this.confirm_pass
          }
          const REGISTER_URL = process.env.API_URL + '/register/'
          axios.post(REGISTER_URL, credenciales).then(function (response) {
            app.$store.commit('login/updatelogin', {token: response.data.token, user: response.data.user})
            app.setAxiosHeaders(response.data.token)
          })
            .catch(function (error) {
              console.log(error)
              app.access = app.$i18n.t('failedLogin')
            })
        } else {
          this.access = this.$i18n.t('incorrectPassword')
        }
      } else {
        this.access = this.$i18n.t('incompleteData')
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
    color  white
    border-radius: 10px 10px 0 0
    font-size: 25px
    text-align: center
    padding: 15px
    background: black
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
.background
  paddin-left: 20px
  background: #1E90FF  
.img
  display: flex
  align-items: center
  justify-content: center    
</style>
