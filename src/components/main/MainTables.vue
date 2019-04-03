<template>
  <div>
    <q-scroll-area class="products">
        <div>
            <div class="row gutter-xs">
              <div class="col-3" v-for="table in tables" :key="table.id">
                  <div class="product cursor-pointer" @click="abrirOrder()">
                  <h2>Mesa {{table.number}}</h2>
                  <h3>Capacity {{table.capacity}}</h3>
                  <br>
                  <br>
                  </div>
              </div>
            </div>
        </div>
    </q-scroll-area>
  </div>
</template>
<script>
import axios from 'Axios'
export default {
  data () {
    return {
      tables: [],
      opened: false,
      description: ''
    }
  },
  mounted () {
    this.listarTable()
  },
  methods: {
    listarTable: function () {
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const TABLES_URL = process.env.API_URL + '/tables/'
      axios.get(TABLES_URL, config).then(response => {
        this.tables = response.data.Tables
      }).catch(e => {
        console.log(e)
      })
    },
    abrirOrder () {
      var app = this
      app.$router.push('/main/add-order/')
    },
    closeModal () {
      this.opened = false
      this.description = ''
    },
    hide () {
      this.opened = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~variables'

.products
  height 80vh
  max-height 100%
  padding 10px

.product
    background white
    border-radius 5px
    border-top 4px solid $primary
    border-left 1px solid $grey-4
    border-right 1px solid $grey-4
    border-bottom 1px solid $grey-4
    text-align center
    padding 4px
    min-height 133px
    max-height 133px

    h2
      font-size 35px
      margin 0
      padding 0
    h3
      font-size 15px
      margin 0
      padding 10px 0 0 5px
  .form
    color  blue
    border-radius 0px 0px 5px 5px
    padding 20px
    text-align: center
    justify-content: center
  .q-btn
    padding-left: 45px
</style>
