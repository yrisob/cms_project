<template>
  <div>
    <h2>This is page with menu content</h2>
    <v-treeview :items="menu"></v-treeview>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
  }),
  mounted () {
    const menu = this.$store.state.menu.menu
    if (!menu || menu.length === 0) {
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
