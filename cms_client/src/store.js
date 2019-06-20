import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUser: 123,
    users: [{
      id: 1,
      name: 'yrisob',
      email: 'yrisob@gmail.com',
      phone: '79216570158',
      createdDate: '21.03.2019 14:13',
      updatedDate: '21.03.2019 14:13'
    },
    {
      id: 2,
      name: 'yrisob2',
      email: 'yrisob@YANDEX.com',
      phone: '7920112121',
      createdDate: '21.03.2019 14:13',
      updatedDate: '21.03.2019 14:13'
    },
    {
      id: 3,
      name: 'MAX',
      email: 'max@itheads.com',
      phone: '79216464423',
      createdDate: '21.03.2019 14:13',
      updatedDate: '21.03.2019 14:13'
    }
    ],
    pages: [{
      id: 1,
      name: 'Главная',
      title: 'Немного о компании ',
      createdDate: '21.03.2019 12:13',
      updatedDate: '23.03.2019 12:13'
    },
    {
      id: 2,
      name: 'Диллер онлайн',
      title: 'Проекть NewDol',
      createdDate: '21.03.2019 17:13',
      updatedDate: '23.03.2019 20:13'
    },
    {
      id: 5,
      name: 'Первый интернет',
      title: 'Проект «Первый интернет» для мобильного оператора',
      createdDate: '21.03.2019 15:13',
      updatedDate: '21.03.2019 14:43'
    }
    ]
  },
  getters: {
    getAuthUser: state => {
      return state.authUser
    },
    getUsers: state => {
      return state.users
    },
    getPages: state => {
      return state.pages
    }
  },
  mutations: {
    deleteUser (state, id) {
      let deletedIndex = state.users.findIndex(usr => usr.id === id)
      state.users.splice(deletedIndex, 1)
    },
    addUser (state, user) {
      let userId = state.users.sort((x, y) => x.id - y.id)[state.users.length - 1] + 1
      user.id = userId
      user.createdDate = dayjs().format('DD.MM.YYYY HH:mm')
      user.updatedDate = dayjs().format('DD.MM.YYYY HH:mm')
      state.users.push(user)
    },
    deletePage (state, id) {
      let deletedIndex = state.pages.findIndex(page => page.id === id)
      state.pages.splice(deletedIndex, 1)
    },
    addPage (state, page) {
      let pageId = state.pages.sort((x, y) => x.id - y.id)[state.pages.length - 1] + 1
      page.id = pageId
      page.createdDate = dayjs().format('DD.MM.YYYY HH:mm')
      page.updatedDate = dayjs().format('DD.MM.YYYY HH:mm')
      state.pages.push(page)
    }
  },
  actions: {
    deleteUser ({
      commit
    }, id) {
      commit('deleteUser', id)
    },
    addUser ({
      commit
    }, user) {
      commit('addUser', user)
    },
    deletePage ({
      commit
    }, id) {
      console.log(id)
      commit('deletePage', id)
    },
    addPage ({
      commit
    }, page) {
      commit('addPage', page)
    }
  }
})
