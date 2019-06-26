import dayjs from 'dayjs'

const userStore = {
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
    ]
  },
  getters: {
    getAuthUser: state => {
      return state.authUser
    },
    getUsers: state => {
      return state.users
    }
  },
  mutations: {
    deleteUser (state, id) {
      let deletedIndex = state.users.findIndex(usr => usr.id === id)
      state.users.splice(deletedIndex, 1)
    },
    addUser (state, user) {
      let userId = state.users.sort((x, y) => x.id - y.id)[state.users.length - 1].id + 1
      user.id = userId
      user.createdDate = dayjs().format('DD.MM.YYYY HH:mm')
      user.updatedDate = dayjs().format('DD.MM.YYYY HH:mm')
      state.users.push(user)
    },
    logout (state) {
      state.authUser = null
    },
    login (state, authUser) {
      state.authUser = authUser
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
    logout ({
      commit
    }) {
      commit('logout')
    },
    login ({
      commit
    }, authUser) {
      commit('login', authUser)
    }
  }
}

export default userStore
