<template>
    <!-- <q-scroll-area style="height: 30vh" class="col-12 self-start"> -->
          <q-list separator class="bg-white cursor-pointer">
              <q-item class="row xs-gutter">
                <q-item-side>
                  1
                </q-item-side>
                <q-item-side>
                  Muzzarella
                </q-item-side>
                <q-item-main>
                  <small style="display:block">description</small>
                </q-item-main>
                <q-item-side right>
                  $200
                </q-item-side>
                <q-context-menu ref="context">
                  <q-list link separator style="min-width: 150px; max-height: 300px;">
                    <q-item @click="showToast(), $refs.context.close()">
                      <q-item-side   icon="add" />
                      <q-item-main class="text-center">
                        Modificar Cantidad
                      </q-item-main>
                      <q-item-side   right icon="remove" />
                    </q-item>
                    <q-item @click="showOtherToast(), $refs.context.close()">
                      <q-item-main label="Eliminar producto" class="delete text-center" />
                    </q-item>
                  </q-list>
                </q-context-menu>
              </q-item>
            <q-item class="row xs-gutter">
                <q-item-side>
                  1
                </q-item-side>
                <q-item-side>
                  Muzzarella
                </q-item-side>
                <q-item-main>
                  <small style="display:block">description</small>
                </q-item-main>
                <q-item-side right>
                  $200
                </q-item-side>
                <q-context-menu ref="context">
                  <q-list link separator style="min-width: 150px; max-height: 300px;">
                    <q-item @click="showToast(), $refs.context.close()">
                      <q-item-side   icon="add" />
                      <q-item-main class="text-center">
                        Modificar Cantidad
                      </q-item-main>
                      <q-item-side   right icon="remove" />
                    </q-item>
                    <q-item @click="showOtherToast(), $refs.context.close()">
                      <q-item-main label="Eliminar producto" class="delete text-center" />
                    </q-item>
                  </q-list>
                </q-context-menu>
              </q-item>
            <q-item class="row xs-gutter">
                <q-item-side>
                  1
                </q-item-side>
                <q-item-side>
                  Muzzarella
                </q-item-side>
                <q-item-main>
                  <small style="display:block">description</small>
                </q-item-main>
                <q-item-side right>
                  $200
                </q-item-side>
                <q-context-menu ref="context">
                  <q-list link separator style="min-width: 150px; max-height: 300px;">
                    <q-item @click="showToast(), $refs.context.close()">
                      <q-item-side   icon="add" />
                      <q-item-main class="text-center">
                        Modificar Cantidad
                      </q-item-main>
                      <q-item-side   right icon="remove" />
                    </q-item>
                    <q-item @click="showOtherToast(), $refs.context.close()">
                      <q-item-main label="Eliminar producto" class="delete text-center" />
                    </q-item>
                  </q-list>
                </q-context-menu>
              </q-item>
          
          </q-list>
        <!-- </q-scroll-area> -->
</template>

<script>
export default {
  data () {
    return {
      readonly: false
    }
  },
}
</script>

<style>

</style>
