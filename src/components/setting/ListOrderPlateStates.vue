<template>
<div>
 <div class="col-sm-8 col-md-12">
    <q-table
    title="Lista de State Order"
    :data="tableOrderData"
    :columns="columns"
    :selected.sync="selectedOrderTable"
    selection="single"
    row-key="description"
  >
  <template slot="top-selection" slot-scope="props">
    <q-btn color="secondary" flat label="Edit" class="q-mr-sm" @click="EditStateOrder"/>
    <div class="col" />
  </template>
  </q-table>
  <br>
  </div>
  <div class="col-sm-8 col-md-12">
   <q-table
    title="Lista de State Plate"
    :data="tablePlateData"
    :columns="columnsPlate"
    :selected.sync="selectedPlateTable"
    selection="single"
    row-key="description"
  >
  <template slot="top-selection" slot-scope="props">
    <q-btn color="secondary" flat label="Edit" class="q-mr-sm" @click="EditStatePlate"/>
    <div class="col" />
  </template>
  </q-table>
 </div>
 </div>
</template>
<script>
export default {
  data  () {
    return {
      columns: [
        {
          name: 'description',
          required: true,
          label: 'Description',
          align: 'left',
          field: 'description',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        }
      ],
      columnsPlate: [
        {
          name: 'description',
          required: true,
          label: 'Description',
          align: 'left',
          field: 'description',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        }
      ],
      tableOrderData: [],
      tablePlateData: [],
      selectedPlateTable: [],
      selectedOrderTable: []
    }
  },
  mounted () {
    this.listStateOrder()
    this.listStatePlate()
  },
  methods: {
    listStateOrder () {
      var listStateOrders = []
      var token = this.$store.state.login.login['token']
      var headers = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LIST_ORDER_TABLES_URL = process.env.API_URL + '/orderstate/'
      fetch(LIST_ORDER_TABLES_URL, headers)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          listStateOrders = data.OrderState
          listStateOrders.forEach(element => {
            var Data = {
              description: element.description,
              id: element.id
            }
            this.tableOrderData.push(Data)
          })
        })
    },
    EditStateOrder () {
      const idStateOrder = this.selectedOrderTable.map(StateOrder => StateOrder.id)
      console.log(idStateOrder)
      this.$router.push('/main/edit-order-state/' + idStateOrder)
    },
    listStatePlate () {
      var listStatePlate = []
      var token = this.$store.state.login.login['token']
      var headers = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LIST_PLATE_TABLES_URL = process.env.API_URL + '/platestates/'
      fetch(LIST_PLATE_TABLES_URL, headers)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          listStatePlate = data.PlateState
          listStatePlate.forEach(element => {
            var Data = {
              description: element.description,
              id: element.id
            }
            this.tablePlateData.push(Data)
          })
        })
    },
    EditStatePlate () {
      const idStatePlate = this.selectedPlateTable.map(StatePlate => StatePlate.id)
      this.$router.push('/main/edit-plate-state/' + idStatePlate)
    }
  }
}
</script>
