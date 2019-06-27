import apiCaller from './api'

const authStore = {
  state: {
    authUser: localStorage.token
  },
  getters: {
    GET_AUTH: state => {
      return state.authUser
    }
  },
  mutations: {
    LOGOUT: (state) => {
      state.authUser = null
    },
    LOGIN: (state, authUser) => {
      state.authUser = authUser
    }
  },
  actions: {
    LOGOUT: ({
      commit
    }) => {
      apiCaller.deleteAuthorization()
      commit('LOGOUT')
    },
    LOGIN: async ({
      commit
    }, authUser) => {
      console.log('login')
      try {
        const {
          status,
          data
        } = await apiCaller.auth.login(authUser)
        if (status === 201) {
          const token = (data.token) ? data.token.accessToken : ''
          if (token) {
            apiCaller.setAuthorization(token)
            localStorage.token = token
            commit('LOGIN', token)
            return true
          }
        }
      } catch (error) {
        if (error.response.data && error.response.data.message) {
          commit('SET_ERROR', error.response.data.message)
          return false
        }
      }
    }
  }
}

export default authStore
