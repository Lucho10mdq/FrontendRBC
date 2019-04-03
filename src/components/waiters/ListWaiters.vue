<template>
 <div class="col-sm-8 col-md-12">
    <q-table
    title="Lista de Mozos"
    :data="tableData"
    :columns="columns"
    :selected.sync="selectedSecond"
    selection="single"
    row-key="name"
  >
    <div slot="top-selection" slot-scope="props">
    <q-btn color="secondary" flat label="Edit" class="q-mr-sm" @click="EditWaiters"/>
    <q-btn color="secondary" flat label="Delete " @click="DeleteWaiters" />
    <div class="col" />
    </div>
  </q-table>
 </div>
</template>
<script>
import axios from 'Axios'
import { Notify } from 'quasar'
export default {
  data  () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        },
        {
          name: 'doc',
          required: true,
          label: 'Dni',
          align: 'left',
          field: 'dni',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        },
        {
          name: 'address',
          required: true,
          label: 'Adreess',
          align: 'left',
          field: 'address',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        },
        {
          name: 'phone',
          required: true,
          label: 'Phone',
          align: 'left',
          field: 'phone',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        },
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'left',
          field: 'email',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        },
        {
          name: 'code',
          required: true,
          label: 'Code',
          align: 'left',
          field: 'code',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        }
      ],
      tableData: [],
      selectedSecond: []
    }
  },
  mounted () {
    this.listWaiters()
  },
  methods: {
    listWaiters () {
      this.tableData= []
      this.selectedSecond = []
      var listWaiters = []
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LIST_WAITERS_URL = process.env.API_URL + '/waiters/'
      axios.get(LIST_WAITERS_URL, config).then(response => {
        listWaiters = response.data.Waiters
        listWaiters.forEach(element => {
          var Data = {
            name: element.people.name,
            code: element.code,
            dni: element.people.doc,
            address: element.people.address,
            phone: element.people.phone,
            email: element.people.email,
            id: element.id
          }
          this.tableData.push(Data)
        })
      })
    },
    EditWaiters () {
      const idWaiters = this.selectedSecond.map(waiter => waiter.id)
      this.$router.push('/main/edit-waiter/' + idWaiters)
    },
    DeleteWaiters () {
      const idWaiters = this.selectedSecond.map(waiter => waiter.id)
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const DELETE_WAITERS_URL = process.env.API_URL + '/waiters/' + idWaiters
      axios.delete(DELETE_WAITERS_URL, config).then(response => {
        if (response.status === 200) {
          Notify.create({
            message: 'Se elimino correctamente',
            type: 'positive',
            position: 'top-right'
          })
          this.listWaiters()
        }
      })
        .catch(e => {
          Notify.create({
            message: 'No se pudo eliminar',
            type: 'negative',
            position: 'top-right'
          })
        })
    }
  }
}
</script>
