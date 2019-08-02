<template>
  <v-navigation-drawer
    stateless
    value="true"
    class="black-back"
    hide-overlay
    fixed
    dark
  >
    <v-list class="container-after-toolbar" :to="'/'">
      <v-layout align-center column justify-center class="header-logo">
        <h2 class="display-3 font-weight-black mb-2" dark>
          &gt;&rfloor;&lfloor;&lt;
        </h2>
        <h2>&#9473;</h2>
        <h2 class="display-3 font-weight-black mb-2" dark>
          ITHeads
        </h2>
      </v-layout>
    </v-list>

    <menu-items :menu="menu"></menu-items>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
import MenuItems from './MenuItems'

export default {
  name: 'app-menu',
  components: {
    MenuItems
  },
  data: () => ({
  }),
  mounted () {
    if (this.$store.state.menu.menu.length === 0) {
      this.$store.dispatch('SET_MENU')
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.menu
    })
  },
  methods: {
  }
}
</script>
