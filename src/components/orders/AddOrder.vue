<template>
    <div class="row gutter-xs overflow-hidden new-sale">
      <div class="col-7">
        <br>
        <select-waiters></select-waiters>
        <br>
        <select-state-order></select-state-order>
        <div class="row">
          <div class="col-10">
          <category :categoriasMenu='categoriasMenu'
          :filtroMenu='filtroMenu'
          v-on:SeleccionarMenu='SeleccionarMenu'>
          </category>          
          </div>
          <div class="col-2">
          </div>
        </div>
      </div>
      <div class="col-5">
        <div class="row">
        <div class="col-12">
          <selected-orders></selected-orders>
        </div>
        </div>
        <div class="row">
        <div class="col-12">
          <total></total>
        </div>
        </div>
      </div>
    </div>
</template>
<script>
import SelectWaiters from './partials/SelectWaiters.vue'
import SelectStateOrder from './partials/SelectStateOrder.vue'
import axios from 'Axios'
import Category from './partials/Category.vue'
import SelectedOrders  from './partials/SelectedOrders.vue'
import Total from './partials/Total.vue'
export default {
    components:{
        SelectWaiters,
        SelectStateOrder,
        Category,
        SelectedOrders,
        Total
    },
    data () {
        return {
            categoriasMenu : [],
            filtroMenu : [],
            menu : []
        }
    },
    mounted() {
        this.seleccionarCategoria ()
        this.GetMenu ()
        this.SeleccionarMenu ()
    },
    methods: {
        seleccionarCategoria () {
            var token = this.$store.state.login.login['token']
            var headers = {
                headers: {'Authorization': 'Bearer ' + token}
            }
            const LIST_CATEGORY_MENU_URL = process.env.API_URL + '/categories/'
            axios.get(LIST_CATEGORY_MENU_URL,headers).then(response => {
                this.categoriasMenu = response.data.Categories
                console.log(this.categoriasMenu)
            })
        },
        GetMenu () {
            var token = this.$store.state.login.login['token']
            var headers = {
                headers: {'Authorization': 'Bearer ' + token}
            }
            const MENU_URL = process.env.API_URL + '/menus/'
            axios.get(MENU_URL,headers).then(response => {
               this.menu = response.data.Menus
               this.menu.forEach(element => {
                       var Data = {
                        id: element.id,
                        name: element.name,
                        description: element.description,
                        price: element.price,
                        location: element.location.description,
                        category: element.category.description,
                        idCategory: element.category.id
                        }
                       this.filtroMenu.push(Data)
               })
            })
            console.log(this.filtroMenu)
        },
        SeleccionarMenu (menu) {
            console.log('menu',menu)
        }
    },
}
</script>
</script>
<style lang="stylus" scoped>
@import '~variables'

.q-if
  margin 0

@media (min-width: 1200px)
  .new-sale
    margin-top 0

.no-margin-bottom
  margin-bottom 0

</style>