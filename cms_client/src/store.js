import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './stores/user.store'
import pageStore from './stores/page.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: userStore,
    page: pageStore
  }
})
