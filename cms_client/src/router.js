import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import EditPage from './views/EditPage.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/editpage',
    name: 'editpage',
    component: EditPage
  }
  ]
})
