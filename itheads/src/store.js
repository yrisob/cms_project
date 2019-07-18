import Vue from 'vue'
import Vuex from 'vuex'
import pageStore from './stores/page.store'
import menuStore from './stores/menu.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    page: pageStore,
    menu: menuStore
  }
})
