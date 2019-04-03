<template>
    <q-scroll-area class="products">
        <div>
            <p>Tables 2</p>
            <div class="row gutter-xs">
                
            </div>
        </div>
    </q-scroll-area>
</template>
<script>
import axios from 'Axios'
export default {
  data () {
    return {
      tables: []
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
</style>
