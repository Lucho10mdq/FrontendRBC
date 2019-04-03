<template>
 <div class="col-sm-8 col-md-12">
    <q-table
    title="Customers List"
    :data="tableData"
    :columns="columns"
    :selected.sync="selectedSecond"
    selection="single"
    row-key="name"
  >
    <template slot="top-selection" slot-scope="props">
    <q-btn color="secondary" flat label="Edit" class="q-mr-sm" @click="EditCustomers"/>
    <div class="col" />
  </template>
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
          name: 'contact',
          required: true,
          label: 'Contact',
          align: 'left',
          field: 'contact',
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
    this.listCustomers()
  },
  methods: {
    listCustomers () {
      this.tableData = []
      this.selectedSecond = []
      var listCustomers = []
      var token = this.$store.state.login.login['token']
      var config = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LIST_CUSTOMERS_URL = process.env.API_URL + '/customers/'
      axios.get(LIST_CUSTOMERS_URL, config).then(response => {
        listCustomers = response.data.Customers
        listCustomers.forEach(element => {
          var Data = {
            name: element.people.name,
            dni: element.people.doc,
            address: element.people.address,
            phone: element.people.phone,
            email: element.people.email,
            id: element.id,
            contact: element.contact,
            contact_phone: element.contact_phone
          }
          this.tableData.push(Data)
        })
      })
    },
    EditCustomers () {
      const idCustomers = this.selectedSecond.map(customer => customer.id)
      this.$router.push('/main/edit-customer/' + idCustomers)
    }
  }
}
</script>
