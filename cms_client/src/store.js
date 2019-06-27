import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './stores/user.store'
import pageStore from './stores/page.store'
import authStore from './stores/auth.store'
import errorStore from './stores/error.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    error: errorStore,
    user: userStore,
    page: pageStore,
    auth: authStore
  }
})
