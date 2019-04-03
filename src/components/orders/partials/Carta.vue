<template>
<div class="main">
  <div class="col-2">
            <q-scroll-area class="categories">
              <div>
                <div class="row">
                  <div class="col-12">
                    <div class="category cursor-pointer" @click="SeleccionarMenu()">
                      <h3>Menu</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="row">
                  <div class="col-12">
                    <div class="category cursor-pointer" @click="SeleccionarMenu()">
                      <h3>Add Order</h3>
                    </div>
                  </div>
                </div>
              </div>
            </q-scroll-area>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      opened : false
    }
  },
  methods: {
    SeleccionarMenu () {
      this.$emit('seleccionarCategoria')
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.categories
  height 87.7vh
  max-height 87.5vh
  margin-top 2px
  .category
    background $blue-1
    border-radius 5px
    padding 27px 5px
    text-align center
    border-top 4px solid $primary
    border-left 1px solid $grey-4
    border-right 1px solid $grey-4
    border-bottom 1px solid $grey-4
    min-height 133px
    max-height 133px
    margin-top 8px
    h3
      font-size 15px
      color $primary
      font-weight 500
      line-height 20px

</style>
