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
    },
    ADD: (state, menuItem) => {
      state.menu.push(menuItem)
    },
    DELETE: (state, id) => {
      const deletedIndex = state.menu.findIndex(menuItem => menuItem.id === id)
      if (deletedIndex > -1) {
        state.menu.splice(deletedIndex, 1)
      }
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
      commit
    }, menuItem) => {
      try {
        const {
          data,
          status
        } = await apiCaller.menu.add(menuItem)
        if (status === 201) {
          commit('ADD', data)
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON
          .stringify(
            response.data.error))
      }
    },
    DELETE: async ({
      commit
    }, id) => {
      try {
        const {
          status
        } = await apiCaller.menu.delete(id)
        if (status === 200) {
          commit('DELETE', id)
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON
          .stringify(
            response.data.error))
      }
    },
    UPDATE: async ({
      commit
    }, {
        id,
        menuItem
      }) => {
      try {
        const {
          data,
          status
        } = await apiCaller.menu.update(id, menuItem)
        if (status === 200) {
          commit('DELETE', id)
          commit('ADD', data)
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON
          .stringify(
            response.data.error))
      }
    }

  }

}

export default menuStore
