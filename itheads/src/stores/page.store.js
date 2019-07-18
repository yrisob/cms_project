import apiCaller from './api'

const pageStore = {
  state: {
    pages: []
  },
  getters: {
    PAGES: state => {
      return state.pages
    },
    PAGE: state => id => {
      return state.pages.find(pg => pg.id === +id)
    }
  },
  mutations: {
    SET_PAGES: (state, pages) => {
      state.pages = pages
    }
  },
  actions: {
    DELETE_PAGE: async ({
      commit
    }, id) => {
      try {
        const {
          status
        } = await apiCaller.pages.delete(id)
        if (status === 200) {
          commit('DELETE_PAGE', id)
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON.stringify(
          response.data.error))
      }
    },
    ADD_PAGE: async ({
      commit
    }, page) => {
      try {
        const {
          status,
          data
        } = await apiCaller.pages.add(page)
        if (status === 201) {
          commit('ADD_PAGE', data)
        }
      } catch ({
        response
      }) {
        console.log(response)
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON.stringify(
          response.data.error))
      }
    },
    GET_PAGE_ID: async ({
      commit
    }, id) => {
      try {
        const {
          data,
          status
        } = await apiCaller.pages.getById(id)
        if (status === 200) {
          commit('DELETE_PAGE', id)
          commit('ADD_PAGE', data.page)
          return data
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON.stringify(
          response.data.error))
        return undefined
      }
    },
    SET_PAGES: async ({
      commit
    }) => {
      try {
        const {
          status,
          data
        } = await apiCaller.pages.all()
        if (status === 200) {
          commit('SET_PAGES', data)
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON.stringify(
          response.data.error))
      }
    }
  }
}

export default pageStore
