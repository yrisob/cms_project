import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store.js'
import * as _ from 'lodash'

Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/:id',
    name: 'main',
    component: Home,
    meta: {
      conditionalRoute: true
    },
    props: (route) => ({
      id: route.params.id
    })

  }, {
    path: ''
  }]
})

router.beforeEach(async (to, from, next) => {
  const endpointPath = to.path
  if (endpointPath === '/') {
    let menu = store.state.menu.menu
    if (menu.length === 0) {
      await store.dispatch('SET_MENU')
    }
    const pageID = _.orderBy(store.state.menu.menu, 'orderNumber')[0].pageId
    next({
      path: `/${pageID}`
    })
  } else {
    next()
  }
})

export default router
