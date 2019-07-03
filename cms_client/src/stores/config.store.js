import apiCaller from './api'

const configStore = {
  state: {
    baseUrl: apiCaller.config.baseUrl,
    imgUrl: ''
  },
  getters: {
    IMG_URL: (state) => {
      return state.imgUrl
    },
    BASE_URL: (state) => {
      return apiCaller.config.baseURL
    }
  },
  mutations: {
    CLEAN_IMG: (state) => {
      state.imgUrl = ''
    },
    SET_IMG: (state, imgUrl) => {
      state.imgUrl = imgUrl
    }
  },
  actions: {
    ADD_IMG: async ({
      commit
    }, img) => {
      commit('CLEAN_IMG')
      try {
        var formData = new FormData()
        formData.append('file', img)
        const {
          data,
          status
        } = await apiCaller.config.upload(formData)
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
