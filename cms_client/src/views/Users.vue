<template>
<div>
    <h1>This is page with users</h1>
    <br>
    <table-with-search
        :tableTitle="tableTitle"
        :searchTitle="searchTitle"
        :headers="headers"
        :search="search"
        :items="items"></table-with-search>
</div>
</template>

<script>
import TableWithSearch from '../components/TableWithSearch'

export default {
  props: ['search'],
  components: {
    TableWithSearch
  },
  data: () => ({
    tableTitle: 'Пользователи',
    searchTitle: 'Поиск',
    headers: [{
      text: 'Dessert (100g serving)',
      align: 'left',
      sortable: false,
      value: 'name'
    },
    {
      text: 'Calories',
      value: 'calories'
    },
    {
      text: 'Fat (g)',
      value: 'fat'
    },
    {
      text: 'Carbs (g)',
      value: 'carbs'
    },
    {
      text: 'Protein (g)',
      value: 'protein'
    },
    {
      text: 'Iron (%)',
      value: 'iron'
    }
    ]
  }),
  computed: {
    items () {
      return this.$store.state.users
    }
  }
}
</script>
