<template>
<div class="container background">
  <div class="row lg-gutter fullscreen " style="margin-left: 0px">
    <div class="col-md-6 col-xs-12 img">
        <img src="">
    </div>
    <div class="col-md-6 col-xs-12 login">
       <div class="col-12 col-sm-8 col-md-4">
        <h1>Ingresar a RBC</h1>
        <div class="form bg-white">
          <q-input v-model="user" type="email" placeholder="user@gmail.com" stack-label="Enter email"/>
          <q-input v-model="pass" type="password" stack-label="Contraseña" />
          <br>
          <q-btn color="primary" @click="login">
              Ingresar
          </q-btn>
          <br>
          <q-field>{{access}}</q-field>
          <div class="register-btn">
            <div class="row">
              <div class="col-12 col-lg-6">
                <q-btn flat color="black" size="sm" @click="$router.push('/register')">{{this.$i18n.t('forgotPassword')}}</q-btn>
              </div>
              <div class="col-12 col-lg-6">
                <q-btn flat color="black" size="sm" @click="$router.push('/register')">{{this.$i18n.t('register')}}</q-btn>
              </div>
            </div>
          </div>
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
      user: '',
      pass: '',
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
    login ({commit}) {
      var app = this
      // app.$router.push('/main')
      const User = this.user
      const Pass = this.pass
      if ((this.user !== '') || (this.pass !== '')) {
        const credenciales = {
          email: User,
          password: Pass
        }
        const LOGIN_URL = process.env.API_URL + '/login/'
        axios.post(LOGIN_URL, credenciales).then(function (response) {
          console.log('llegue')
          app.$store.commit('login/updatelogin', {token: response.data.token, user: response.data.user})
          app.setAxiosHeaders(response.data.token)
        })
          .catch(function (error) {
            console.log(error)
            app.access = app.$i18n.t('failedLogin')
          })
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
    border-radius: 5px 5px 0 0
    font-size: 25px
    text-align: center
    padding: 10px
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
.img
  display: flex
  align-items: center
  justify-content: center
.background
  paddin-left: 20px
  background: red  

.article 
    background-color: blue;
    width: 80%;
    height: 60vh;
    margin: center;
    position: relative;
    margin-top: 5%;

</style>
