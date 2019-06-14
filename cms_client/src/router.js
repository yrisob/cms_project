import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import EditPage from './views/EditPage.vue'
import Users from './views/Users.vue'
import Menu from './views/Menu.vue'
import Pages from './views/Pages.vue'
import Banners from './views/Banners.vue'
import Page from './views/Page.vue'

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
  },
  {
    path: '/pages',
    name: 'pages',
    component: Pages
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    props: (router) => ({
      search: router.query.search
    })
  },
  {
    path: '/banners',
    name: 'banners',
    component: Banners
  },
  {
    path: '/page/:id',
    component: Page,
    props: (route) => ({
      id: route.params.id,
      query: route.query
    })
  }
  ]
})
