<template>
  <div id="app">
    <v-app id="inspire" white>
      <app-toolbar></app-toolbar>
      <v-layout class="container-after-toolbar"  grid-list-xl white>
        <v-layout row wrap white>
          <v-flex xs3 md3 lg3 class="max-height" v-if="showMenu">
            <app-menu ></app-menu>
          </v-flex>
          <v-flex xs8 md8 lg8 :class="(showMenu)? '': 'offset-xs2 offset-md2 offset-lg2'">
            <v-container class="max-height">
              <router-view></router-view>
            </v-container>
          </v-flex>
        </v-layout>
      </v-layout>
      <app-footer :links="links" />
    </v-app>
  </div>
</template>
<script>
import AppFooter from './components/AppFooter'
import AppMenu from './components/AppMenu'
import AppToolbar from './components/AppTollbar'
import './assets/main.css'

export default {
  name: 'App',
  components: {
    AppFooter,
    AppMenu,
    AppToolbar
  },
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us'
    ]
  }),
  computed: {
    showMenu () {
      return !!this.$store.getters.getAuthUser
    }
  },
  methods: {

  }
}
</script>
