import apiCaller from './api'

const configStore = {
  state: {
    baseUrl: apiCaller.config.baseUrl,
    imgUrl: ''
  },
  getters: {
    IMG_URL: (state) => {
      return state.imgUrl
    }
  },
  actions: {
    CLEAN_IMG: (state) => {
      state.imgUrl = ''
    },
    SET_IMG: (state, imgUrl) => {
      state.imgUrl = imgUrl
    }
  },
  mutations: {
    ADD_IMG: async ({
      commit
    }, img) => {
      commit('CLEAN_IMG')
      try {
        const {
          data,
          status
        } = await apiCaller.config.upload(img)
        if (status === 201) {
          commit('SET_IMG', data.imgUrl)
          return data.imgUrl
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON.stringify(
          response.data.error))
        return undefined
      }
    }
  }

}

export default configStore
