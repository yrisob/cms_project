import apiCaller from './api'

const blockStore = {
  state: {
    blocks: []
  },
  getters: {
    BLOCKS: (state) => {
      return state.blocks
    },
    BLOCK: (state, id) => {
      return state.blocks.find(block => +block.id === +id)
    }
  },
  mutations: {
    SET_BLOCK: (state, blocks) => {
      state.blocks = blocks
    },
    ADD_BLOCK: (state, block) => {
      state.blocks.push(block)
    },
    DELETE_BLOCK: (state, id) => {
      const deletedIndex = state.blocks.findIndex(block => +block.id === +id)
      if (deletedIndex > -1) {
        state.blocks.splice(deletedIndex, 1)
      }
    }
  },
  actions: {
    SET_BLOCK: async ({
      commit
    }) => {
      try {
        const {
          data,
          status
        } = await apiCaller.blocks.all()
        if (status === 200) {
          commit('SET_BLOCK', data)
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON.stringify(
          response.data.error))
      }
    },
    ADD_BLOCK: async ({
      commit
    }, block) => {
      try {
        const {
          data,
          status
        } = await apiCaller.blocks.add(block)
        if (status === 201) {
          commit('ADD_BLOCK', data)
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON.stringify(
          response.data.error))
      }
    },
    DELETE_BLOCK: async ({
      commit
    }, id) => {
      try {
        const {
          status
        } = await apiCaller.blocks.delete(id)

        if (status === 200) {
          commit('DELETE_BLOCK', id)
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

export default blockStore
