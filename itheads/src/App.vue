<template>
  <v-app>
    <app-menu></app-menu>
    <main style="padding: 0px 0px 0px 300px;">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import AppMenu from './components/AppMenu'
import './assets/main.css'

export default {
  name: 'App',
  components: {
    AppMenu
  },
  data () {
    return {
      //
    }
  }
}
</script>
