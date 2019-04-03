<template>
    <q-select v-model="Waiters"
        float-label="Waiters"
        :filter="true"
        :options="WaitersOptions"
    />
</template>
<script>
import axios from 'Axios'
export default {
    data () {
        return {
            Waiters: [],
            WaitersOptions: []
        }
    },
    mounted() {
        this.ListWaiters()
    },
    methods: {
        ListWaiters () {
            var waiterlist = []
            var token = this.$store.state.login.login['token']
            var headers = {
                headers: {'Authorization': 'Bearer ' + token}
            }
            const LIST_WAITERS_URL = process.env.API_URL + '/waiters/'
            axios.get(LIST_WAITERS_URL,headers).then(response =>{
                waiterlist = response.data.Waiters
                this.WaitersOptions = waiterlist.map(function (waiter){
                    console.log(waiter.code)
                    return {label:waiter.code, value:waiter.id}
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
 margin-left 20px
</style>