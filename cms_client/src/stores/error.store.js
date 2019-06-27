const errorStore = {
  state: {
    message: ''
  },
  getters: {
    error: state => {
      return state.message
    }
  },
  mutations: {
    SET_ERROR: (state, err) => {
      state.message = err
    }
  },
  actions: {
    SET_ERROR: ({
      commit
    }, err) => {
      commit('SET_ERROR', err)
    }
  }
}

export default errorStore
