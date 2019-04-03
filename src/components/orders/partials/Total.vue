<template>
  <div class="main">
    <q-list class="bg-white payment-info" >
            <q-item-separator class="no-margin-bottom" />
            <q-item class="bg-secondary cursor-pointer pay" to="pagar-venta">
              <q-item-main>
                Save
              </q-item-main>
            </q-item>
            <q-item>
              <q-item-main>
                Sub-total
              </q-item-main>
              <q-item-side right>
                $200
              </q-item-side>
            </q-item>
            <q-item-separator />
            <q-item>
              <q-item-main >
                <span class="total-discount cursor-pointer">Agregar descuento</span>
              </q-item-main>
              <q-item-main>
                <span>Descuento</span>
                <q-context-menu ref="context">
                  <q-list link separator style="min-width: 150px; max-height: 300px;">
                    <q-item @click.native="openmodal(), $refs.context.close()">
                      <q-item-side icon="add" />
                      <q-item-main class="text-center">
                        Modificar Descuento
                      </q-item-main>
                      <q-item-side right icon="remove" />
                    </q-item>
                    <q-item @click="showOtherToast(), $refs.context.close()">
                      <q-item-main @click.native="deleteDiscount()" label="Eliminar Descuento" class="delete text-center" />
                    </q-item>
                  </q-list>
                </q-context-menu>
              </q-item-main>
              <q-item-side right v-if="discount == ''">
              </q-item-side>
              <q-item-side right v-else>
               $20
              </q-item-side>
            </q-item>
            <q-item-separator />
            <q-item>
              <q-item-main>
                Impuestos
              </q-item-main>
              <q-item-side right>
                $
              </q-item-side>
            </q-item>
            <q-item-separator class="no-margin-bottom" />
            <q-item class="bg-primary cursor-pointer pay" to="pagar-venta">
              <q-item-main>
                Cobrar
              </q-item-main>
              <q-item-side right>
                
                $200
              </q-item-side>
            </q-item>
          </q-list>
  </div>
</template>

<script>

import SelectedOrders from './SelectedOrders.vue'

export default {
  components: {
    SelectedOrders
  },
  data () {
    return {
      open: false,
    }
  },
  methods: {
    openmodal () {
      this.open = true
    },
    closeModal () {
      this.open = false
    },
    fivepercent () {
      this.percent = (this.subtotal * 5) / 100
      this.open = false
      this.discount = this.percent
    },
    tenpercent () {
      this.percent = (this.subtotal * 10) / 100
      this.open = false
      this.discount = this.percent
    },
    fifteenpercent () {
      this.percent = (this.subtotal * 15) / 100
      this.open = false
      this.discount = this.percent
    },
    twentypercent () {
      this.percent = (this.subtotal * 20) / 100
      this.open = false
      this.discount = this.percent
    },
    applyDiscount (discount) {
      this.discount = discount
      if (this.discount.substring(0, 1) === '$') {
        this.discount = this.discount.substring(1)
      } else {
        this.percent = (this.subtotal * this.discount) / 100
        this.discount = this.percent
      }
      this.open = false
    },
    deleteDiscount () {
      this.discount = ''
    },
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'

.payment-info
  padding-bottom 0

.delete
  color $red
  font-weight 500

.total-discount
  color $primary

.pay
  color white
  font-size 20px
  font-weight 500
  padding 12px 20px
.pay .q-item-side
  color white

</style>
