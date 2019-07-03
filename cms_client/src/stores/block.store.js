import apiCaller from './api'

const blockStore = {
  state: {
    blocks: []
  },
  getters: {
    BLOCKS: (state) => {
      return state.blocks
    },
    BLOCK: (state) => (id) => {
      return state.blocks.find(block => +block.id === +id)
    }
  },
  mutations: {
    SET_BLOCK: (state, blocks) => {
      state.blocks = []
      state.blocks = blocks
    },
    ADD_BLOCK: (state, block) => {
      state.blocks.push(block)
    },
    DELETE_BLOCK: (state, id) => {
      const deletedIndex = state.blocks.findIndex(block => block.id === +id)
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
    GET_BLOCK_BY_ID: async (context, id) => {
      try {
        const {
          data,
          status
        } = await apiCaller.blocks.getByID(id)
        if (status === 200) {
          context.commit('DELETE_BLOCK', id)
          context.commit('ADD_BLOCK', data)
          return data
        }
      } catch ({
        response
      }) {
        context.commit('SET_ERROR', (response && response.data.message) ? response.data
          .message : JSON
          .stringify((response)
            ? response.data.error : response))
        return undefined
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
          return true
        }
      } catch ({
        response
      }) {
        commit('SET_ERROR', (response.data.message) ? response.data.message : JSON.stringify(
          response.data.error))
        return false
      }
    },
    UPDATE_BLOCK: async ({
      commit
    }, {
        id,
        block
      }) => {
      try {
        const {
          data,
          status
        } = await apiCaller.blocks.update(id, block)
        if (status === 200) {
          commit('DELETE_BLOCK', id)
          commit('ADD_BLOCK', data)
          return true
        }
      } catch ({
        response
      }) {
        console.log('update_block error')
        console.log(response)
        commit('SET_ERROR', (response && response.data.message) ? response.data.message : JSON
          .stringify(response.data.error))
        return false
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
