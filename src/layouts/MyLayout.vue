<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar style="margin-left: 0px"
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>
          RBC
          <div slot="subtitle">Running on RBC version 1.0 </div>
          <div slot="subtitle">
          <q-field>
            <q-input color="blue"   v-model="hour" />
          </q-field>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
    <q-list-header>Menu Principal</q-list-header>
    <q-list separator>
      <q-collapsible indent icon="home" label="Main" sublabel="main" closed>
        <q-item @click.native="$router.push('/main')">
          <q-item-side icon="home" />
          <q-item-main label="Mesas" sublabel="mesas" />
        </q-item>
      </q-collapsible>
      <!-- tables -->
      <q-collapsible indent icon="view_carousel" label="Tables" sublabel="tables" closed>
        <q-item @click.native="$router.push('/main/list-table')">
          <q-item-side icon="view_carousel" />
          <q-item-main label="List" sublabel="list of tables" />
        </q-item>
        <q-item @click.native="$router.push('/main/add-table')">
          <q-item-side icon="view_carousel" />
          <q-item-main label="Edit" sublabel="add or edit tables" />
        </q-item>
        <q-collapsible indent icon="edit_location" label="Locations" sublabel="locations" closed>
          <q-item @click.native="$router.push('/main/list-locations-tables')">
            <q-item-side icon="edit_location" />
            <q-item-main label="List" sublabel="list of locations" />
          </q-item>
          <q-item @click.native="$router.push('/main/add-location-table')">
            <q-item-side icon="edit_location" />
            <q-item-main label="Edit" sublabel="add or edit locations" />
          </q-item>
        </q-collapsible>
      </q-collapsible>
      <!-- customers -->
      <q-collapsible indent icon="sentiment_satisfied_alt" label="Customers" sublabel="customers" closed>
          <q-item @click.native="$router.push('/main/register-customer')">
            <q-item-side icon="sentiment_satisfied_alt" />
            <q-item-main label="Add" sublabel="add customers" />
          </q-item>
          <q-item @click.native="$router.push('/main/list-customer')">
            <q-item-side icon="sentiment_satisfied_alt" />
            <q-item-main label="List" sublabel="list customers" />
          </q-item>
      </q-collapsible>
      <!-- waiters -->
      <q-collapsible indent icon="sentiment_satisfied_alt" label="Waiters" sublabel="waiters" closed>
          <q-item @click.native="$router.push('/main/register-waiter')">
            <q-item-side icon="sentiment_satisfied_alt" />
            <q-item-main label="Add" sublabel="add waiters" />
          </q-item>
          <q-item @click.native="$router.push('/main/list-waiter')">
            <q-item-side icon="sentiment_satisfied_alt" />
            <q-item-main label="List" sublabel="list waiters" />
          </q-item>
      </q-collapsible>
      <!-- menu -->
      <q-collapsible indent icon="fastfood" label="Menu" sublabel="menu" closed>
          <q-item @click.native="$router.push('/main/add-menu')">
            <q-item-side icon="fastfood" />
            <q-item-main label="Add" sublabel="add a new plate to menu" />
          </q-item>
          <q-item @click.native="$router.push('/main/list-menu')">
            <q-item-side icon="fastfood" />
            <q-item-main label="List" sublabel="list menu" />
          </q-item>
          <!-- locations -->
          <q-collapsible indent icon="edit_location" label="Locations" sublabel="locations" closed>
              <q-item @click.native="$router.push('/main/add-location-menu')">
                <q-item-side icon="edit_location" />
                <q-item-main label="Add" sublabel="add a new location to menu" />
              </q-item>
              <q-item @click.native="$router.push('/main/list-locations-menus')">
                <q-item-side icon="edit_location" />
                <q-item-main label="List" sublabel="list a locations of menus" />
              </q-item>
          </q-collapsible>
          <!-- categories -->
          <q-collapsible indent icon="category" label="Categories" sublabel="categories" closed>
              <q-item @click.native="$router.push('/main/add-category-menu')">
                <q-item-side icon="category" />
                <q-item-main label="Add" sublabel="add a new category to menu" />
              </q-item>
              <q-item @click.native="$router.push('/main/list-categories-menus')">
                <q-item-side icon="category" />
                <q-item-main label="List" sublabel="list a categories of menus" />
              </q-item>
          </q-collapsible>
      </q-collapsible>
      <!-- settings -->
      <q-collapsible indent icon="settings" label="Setting" sublabel="setting" closed>
          <q-item @click.native="$router.push('/main/add-order-plate-state')">
            <q-item-side icon="settings" />
            <q-item-main label="Add" sublabel="add order and plate" />
          </q-item>
          <q-item @click.native="$router.push('/main/list-order-plate-state')">
            <q-item-side icon="settings" />
            <q-item-main label="List" sublabel="list order and plate" />
          </q-item>
      </q-collapsible>
      <!-- logout -->
      <q-item @click.native="logout">
        <q-item-side icon="power_settings_new" />
        <q-item-main label="Cerrar Sesión" sublabel="salir" />
      </q-item>
  </q-list>

    </q-layout-drawer>
    <q-page-container>
    <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      hour: ''
    }
  },
  mounted () {
    this.TakeHour()
  },
  methods: {
    logout: function () {
      var app = this
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LOGOUT_URL = process.env.API_URL + '/logout/'
      axios.get(LOGOUT_URL, config).then(function (response) {
        console.log(response)
      })
        .catch(function (error) {
          console.log(error)
        })
      app.$router.push('/')
    },
    TakeHour () {
      var app = this
      var a = new Date()
      a.getHours()
      app.hour = a
      console.log(app.hour)
    }
  }
}
</script>
<style lang="stylus" scoped>
.q-input
    color red
</style>
