import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './stores/user.store'
import pageStore from './stores/page.store'
import authStore from './stores/auth.store'
import errorStore from './stores/error.store'
import configStore from './stores/config.store'
import blockStore from './stores/block.store'
import menuStore from './stores/menu.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    error: errorStore,
    user: userStore,
    page: pageStore,
    auth: authStore,
    block: blockStore,
    config: configStore,
    menu: menuStore
  }
})
