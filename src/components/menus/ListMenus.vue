<template>
<div class="col-sm-8 col-md-12">
    <q-table
    title="List Menus"
    :data="tableData"
    :columns="columns"
    :selected.sync="selectedData"
    selection="single"
    row-key="name">
    <template slot="top-selection" slot-scope="props">
      <q-btn color="primary" flat label="Edit" class="q-mr-sm" @click="EditMenu"/>
    </template>
  </q-table>
</div>
</template>
<script>
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
          name: 'description',
          required: true,
          label: 'Description',
          align: 'left',
          field: 'description',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        },
        {
          name: 'price',
          required: true,
          label: 'Price',
          align: 'left',
          field: 'price',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        },
        {
          name: 'location',
          required: true,
          label: 'Location',
          align: 'left',
          field: 'location',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        },
        {
          name: 'category',
          required: true,
          label: 'Category',
          align: 'left',
          field: 'category',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        }
      ],
      tableData: [],
      selectedData: []
    }
  },
  mounted () {
    this.listMenus()
  },
  methods: {
    listMenus () {
      var listMenus = []
      var token = this.$store.state.login.login['token']
      var headers = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LIST_MENUS_TABLES_URL = process.env.API_URL + '/menus/'
      fetch(LIST_MENUS_TABLES_URL, headers)
        .then(res => res.json())
        .then(data => {
          listMenus = data.Menus
          listMenus.forEach(element => {
            var Data = {
              id: element.id,
              name: element.name,
              description: element.description,
              price: element.price,
              location: element.location.description,
              category: element.category.description
            }
            this.tableData.push(Data)
          })
        })
    },
    EditMenu () {
      const idMenu = this.selectedData.map(menu => menu.id)
      this.$router.push('/main/edit-menu/' + idMenu)
    }
    // DeleteMenu () {
    //   const idMenu = this.selectedData.map(menu => menu.id)
    //   var token = this.$store.state.login.login['token']
    //   var config = {
    //     headers: {'Authorization': 'Bearer ' + token}
    //   }
    //   const DELETE_MENUS_URL = process.env.API_URL + '/menus/' + idMenu
    //   axios.delete(DELETE_MENUS_URL, config).then(response => {
    //     if (response.status === 200) {
    //       Notify.create({
    //         message: 'Se elimino correctamente',
    //         type: 'positive',
    //         position: 'top-right'
    //       })
    //     }
    //   })
    //     .catch(e => {
    //       Notify.create({
    //         message: 'No se pudo eliminar',
    //         type: 'negative',
    //         position: 'top-right'
    //       })
    //     })
    //   this.listMenus()
    // }
  }
}
</script>
