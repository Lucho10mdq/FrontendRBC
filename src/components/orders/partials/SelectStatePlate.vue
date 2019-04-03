<template>
    <q-select v-model="PlateState"
        float-label="Plate State"
        :filter="true"
        :options="PlateStateOptions"
    />
</template>
<script>
import axios from 'Axios'
export default {
    data () {
        return {
            PlateState: [],
            PlateStateOptions: []
        }
    },
    mounted() {
        this.ListPlateState()
    },
    methods: {
        ListPlateState () {
            var PlateStatelist = []
            var token = this.$store.state.login.login['token']
            var headers = {
                headers: {'Authorization': 'Bearer ' + token}
            }
            const LIST_PLATE_TABLES_URL = process.env.API_URL + '/platestates/'
            axios.get(LIST_PLATE_TABLES_URL,headers).then(response =>{
                PlateStatelist = response.data.PlateState
                this.PlateStateOptions = PlateStatelist.map(function (plate){
                    return {label:plate.description, value:plate.id}
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