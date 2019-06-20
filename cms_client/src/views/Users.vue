<template>
  <div>
    <h1>Список пользователей системы</h1>
    <br />
    <table-with-search
      :tableTitle="tableTitle"
      :searchTitle="titleSearch"
      :headers="headers"
      :search="getSearchText"
      :items="users"
      :actions="['delete']"
      @deleteAction="deleteUser"
    ></table-with-search>
    <div>
      <br /><br />
      <v-btn v-if="!createUser" @click="showCreateUserForm(true)" small
        >+ Добавить пользователя</v-btn
      >
      <create-user
        v-if="createUser"
        @visualize="createUser = $event"
        @createUser="addUser"
      ></create-user>
    </div>
  </div>
</template>

<script>
import TableWithSearch from '../components/TableWithSearch'
import CreateUser from '../components/CreateUser'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['search'],
  components: {
    TableWithSearch,
    CreateUser
  },
  data: () => ({
    tableTitle: 'Пользователи',
    titleSearch: 'Поиск',
    isCreateUser: false,
    headers: [
      {
        text: 'Имя',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      {
        text: 'Email',
        align: 'right',
        value: 'email'
      },
      {
        text: 'Телефон',
        align: 'right',
        value: 'phone'
      },
      {
        text: 'Регистрация',
        align: 'right',
        value: 'createdDate'
      },
      {
        text: 'Изменения',
        align: 'right',
        value: 'updatedDate'
      },
      {
        text: 'Действия',
        align: 'right',
        action: true,
        value: 'id'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      users: 'getUsers'
    }),
    createUser: {
      get () {
        return this.isCreateUser
      },
      set (newValue) {
        this.isCreateUser = newValue
      }
    },
    getSearchText: {
      get () {
        if (this.search) {
          return '' + this.search
        }
        return ''
      },
      set (newValue) {
        this.search = newValue
      }
    }
  },
  methods: {
    showCreateUserForm (event) {
      console.log('addUser')
      this.isCreateUser = event
    },
    ...mapActions(['deleteUser', 'addUser'])
  }
}
</script>
