<template>
  <div>
      <q-table
      title="Lista de Ubicaciones"
      :data="tableData"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>
<script>
export default {
  data  () {
    return {
      opened: false,
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
        },
        {
          name: 'edit',
          required: true,
          label: 'Editar',
          align: 'center',
          sortable: true,
          classes: 'my-class',
          style: 'width: 200px'
        }
      ],
      tableData: []
    }
  },
  mounted () {
    this.listLocations()
  },
  methods: {
    listLocations () {
      var listLocations = []
      var token = this.$store.state.login.login['token']
      var headers = {
        headers: {'Authorization': 'Bearer ' + token}
      }
      const LIST_LOCATIONS_TABLES_URL = process.env.API_URL + '/locations_tables/'
      fetch(LIST_LOCATIONS_TABLES_URL, headers)
        .then(res => res.json())
        .then(data => {
          listLocations = data.Locations_Tables
          listLocations.forEach(element => {
            var Data = {
              description: element.description
            }
            this.tableData.push(Data)
          })
        })
    }
  }
}
</script>
