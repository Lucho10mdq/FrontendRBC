<template>
    <q-select v-model="StateOrders"
        float-label="State Orders"
        :filter="true"
        :options="StateOrdersOptions"
    />
</template>
<script>
import axios from 'Axios'
export default {
    data () {
        return {
            StateOrders: [],
            StateOrdersOptions: []
        }
    },
    mounted() {
        this.ListStateOrder()
    },
    methods: {
        ListStateOrder () {
            var app = this
            var listStateOrder = []
            var token = this.$store.state.login.login['token']
            var headers = {
                headers: {'Authorization': 'Bearer ' + token}
            }
            const LIST_ORDER_TABLES_URL = process.env.API_URL + '/orderstate/'
            axios.get(LIST_ORDER_TABLES_URL,headers).then(response =>{
                listStateOrder = response.data.OrderState
                app.StateOrdersOptions = listStateOrder.map(function (order){
                    console.log(order)
                    return { label:order.description, value:order.id}
                })
            }).catch(e =>{
                alert(e)
            })
        }
    },
}
</script>
<style lang="stylus" scoped>
@import '~variables'

.q-select
 padding 10px
 margin-left 15px
</style>