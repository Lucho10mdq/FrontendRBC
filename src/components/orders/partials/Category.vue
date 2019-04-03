<template>
    <div>
    <q-scroll-area class="products">
      <div>
        <div class="row gutter-xs">
          <div  class="col-3" v-for="cat in categoriasMenu" :key="cat.id">
            <div class="product cursor-pointer" @click="abrilModal(cat.id)" >
              <h3>{{cat.description}}</h3>
              <br>
              <br>
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>
    <template>
        <div>
            <q-modal v-model="opened">
                <h3>Seleccione el menu </h3>
                <q-scroll-area class="products">
                    <div>
                        <div class="row gutter-xs">
                        <div  class="col-3" v-for="menu in filtroCategory" :key="menu.id">
                            <div class="product cursor-pointer" @click="SeleccionarMenu(menu)" >
                            <h3>{{menu.name}}</h3>
                            <h3>${{menu.price}}</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                 </q-scroll-area>
                <q-btn
                color="secondary"
                @click="opened = false"
                label="Close"
                />
                <q-btn
                color="amber"
                label="Add"
                />
            </q-modal>
        </div>
    </template>
  </div>
</template>
<script>
import axios from 'Axios'
export default {
    props: ['categoriasMenu','filtroMenu'],
    data () {
        return {
            opened : false,
            menu: [],
            filtroCategory: []
        }
    },
    methods: {
        abrilModal (id) {
            this.opened = true
            this.filtroCategory = []
                this.filtroMenu.forEach(element => {
                   if(element.idCategory == id) {
                       console.log('llegue')
                       var Data = {
                        id: element.id,
                        name: element.name,
                        description: element.description,
                        price: element.price,
                        location: element.location,
                        category: element.category
                        }
                        this.filtroCategory.push(Data)
                   }
               })
        },
        SeleccionarMenu (menu){
            this.$emit('SeleccionarMenu',menu)
        }
    },
    
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
      font-size 15px
      margin 0
      padding 0
    h3
      font-size 15px
      margin 0
      padding 15px 0 0 5px
</style>
