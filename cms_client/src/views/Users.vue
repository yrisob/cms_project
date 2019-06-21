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
      <create-item-component
        v-if="createUser"
        :createItemTitle="createTitle"
        :textFields="userFields"
        @visualize="createUser = $event"
        @create="addUser"
      ></create-item-component>
    </div>
  </div>
</template>

<script>
import TableWithSearch from '../components/TableWithSearch'
import CreateItemComponent from '../components/CreateItemComponent'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['search'],
  components: {
    TableWithSearch,
    CreateItemComponent
  },
  data: () => ({
    tableTitle: 'Пользователи',
    titleSearch: 'Поиск',
    isCreateUser: false,
    createTitle: 'Создать пользователя',
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
    ],
    userFields: [
      {
        type: 'text',
        propName: 'name',
        title: 'Имя',
        value: '',
        validateRule: 'required|min:3'
      },
      {
        type: 'email',
        propName: 'email',
        value: '',
        title: 'E-mail',
        validateRule: 'required|email'
      },
      {
        type: 'text',
        propName: 'phone',
        value: '',
        title: 'Телефон',
        validateRule: 'required|digits:11'
      },
      {
        type: 'password',
        propName: 'password',
        value: '',
        title: 'Пароль',
        validateRule: 'required|min:8'
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
