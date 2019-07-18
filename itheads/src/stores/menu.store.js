import apiCaller from './api'

const menuStore = {
  state: {
    menu: []
  },
  getters: {},
  mutations: {
    SET_MENU: (state, menu) => {
      state.menu = []
      state.menu = menu
    }
  },
  actions: {
    SET_MENU: async ({
      commit
    }) => {
      try {
        const {
          data,
          status
        } = await apiCaller.menu.all()
        if (status === 200) {
          commit('SET_MENU', data)
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON
          .stringify(
            response.data.error))
      }
    },
    ADD: async ({
      commit,
      dispatch
    }, menuItem) => {
      try {
        console.log(menuItem)
        const {
          status
        } = await apiCaller.menu.add(menuItem)
        if (status === 201) {
          await dispatch('SET_MENU')
          return true
        }
      } catch ({
        response
      }) {
        console.log(response)
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON
          .stringify(
            response.data.error))
        return false
      }
    },
    DELETE: async ({
      commit,
      dispatch
    }, id) => {
      try {
        const {
          status
        } = await apiCaller.menu.delete(id)
        if (status === 200) {
          await dispatch('SET_MENU')
          return true
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON
          .stringify(
            response.data.error))
        return false
      }
    },
    UPDATE: async ({
      dispatch,
      commit
    }, {
        id,
        menuItem
      }) => {
      try {
        const {
          status
        } = await apiCaller.menu.update(id, menuItem)
        if (status === 200) {
          await dispatch('SET_MENU')
          return true
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON
          .stringify(
            response.data.error))
        return false
      }
    }

  }

}

export default menuStore
