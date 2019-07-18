import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
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
