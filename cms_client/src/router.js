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
import Login from './views/Login.vue'
import store from './store.js'

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    props: route => ({
      endpoint: route.query.endpoint
    })
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      conditionalRoute: true
    }
  },
  {
    path: '/editpage',
    name: 'editpage',
    component: EditPage,
    meta: {
      conditionalRoute: true
    }
  },
  {
    path: '/pages',
    name: 'pages',
    component: Pages,
    meta: {
      conditionalRoute: true
    },
    props: route => ({
      search: route.query.search
    })
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
    meta: {
      conditionalRoute: true
    }
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    meta: {
      conditionalRoute: true
    },
    props: (router) => ({
      search: router.query.search
    })
  },
  {
    path: '/banners',
    name: 'banners',
    component: Banners,
    meta: {
      conditionalRoute: true
    }
  },
  {
    path: '/page/:id',
    component: Page,
    meta: {
      conditionalRoute: true
    },
    props: (route) => ({
      id: route.params.id,
      query: route.query
    })
  }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.conditionalRoute)) {
    if (store.getters.getAuthUser) {
      next()
    } else {
      next({
        path: `/login?endpoint=${to.path}`
      })
    }
  } else {
    next()
  }
})

export default router
