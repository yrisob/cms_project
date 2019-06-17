<template>
<div>
    <h1>Список пользователей системы</h1>
    <br>
    <table-with-search
        :tableTitle="tableTitle"
        :searchTitle="searchTitle"
        :headers="headers"
        :search="search"
        :items="items"></table-with-search>
    <div>
      <br><br>
     <v-btn  v-if="!createUser" @click="showCreateUserForm(true)" small>+ Добавить пользователя</v-btn>
     <create-user v-if="createUser"  @interface="createUser = $event"></create-user>
    </div>
</div>
</template>

<script>
import TableWithSearch from '../components/TableWithSearch'
import CreateUser from '../components/CreateUser'

export default {
  props: ['search'],
  components: {
    TableWithSearch,
    CreateUser
  },
  data: () => ({
    tableTitle: 'Пользователи',
    searchTitle: 'Поиск',
    isCreateUser: false,
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
    },
    createUser: {
      get () {
        return this.isCreateUser
      },
      set (newValue) {
        this.isCreateUser = newValue
      }
    }
  },
  methods: {
    showCreateUserForm (event) {
      console.log('addUser')
      this.isCreateUser = event
    }
  }
}
</script>
