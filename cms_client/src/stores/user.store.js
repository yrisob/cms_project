import apiCaller from './api'

const userStore = {
  state: {
    users: []
  },
  getters: {
    USERS: state => {
      return state.users
    }
  },
  mutations: {
    DELETE_USER: (state, id) => {
      if (state.users && state.users.length > 0) {
        let deletedIndex = state.users.findIndex(usr => usr.id === id)
        state.users.splice(deletedIndex, 1)
      }
    },
    ADD_USER: (state, user) => {
      state.users.push(user)
    },
    SET_USERS: (state, users) => {
      state.users = users
    }

  },
  actions: {
    GET_USERS: async ({
      commit
    }) => {
      try {
        const {
          status,
          data
        } = await apiCaller.users.all()
        if (status === 200) {
          commit('SET_USERS', data)
        }
      } catch (err) {
        console.warn(err.response)
        commit('SET_ERROR', (err.response.data && err.response.data.message) ? err.response.data
          .message : 'что-то пошло не так')
      }
    },
    DELETE_USER: async ({
      commit
    }, id) => {
      try {
        const {
          status
        } = await apiCaller.users.delete(id)
        console.log(status)
        if (status === 200) {
          commit('DELETE_USER', id)
        }
      } catch (err) {
        commit('SET_ERROR', err.response.data.message)
      }
    },
    ADD_USER: async ({
      commit
    }, user) => {
      try {
        const response = await apiCaller.users.add(user)
        const {
          status,
          data
        } = response
        console.log('in try')
        console.log(response)
        if (status === 200) {
          commit('ADD_USER', data)
          return true
        }
      } catch (error) {
        console.log('catch add user')
        console.log(error.response)
        commit('SET_ERROR', error.response.data.message)
        return false
      }
    }
  }
}

export default userStore
