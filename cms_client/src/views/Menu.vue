<template>
  <div>
    <h2>Состав меню</h2>
    <br />
    <menu-tree :menuItems="menu" :pages="pages" :level="0"></menu-tree>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuTree from '../components/MenuTree'

export default {
  components: {
    MenuTree
  },
  data: () => ({
  }),
  mounted () {
    const menu = this.$store.state.menu.menu
    if (!menu || menu.length === 0) {
      this.$store.dispatch('SET_MENU')
    }
    const pages = this.$store.state.page.pages
    if (!pages || pages.length === 0) {
      this.$store.dispatch('SET_PAGES')
    }
  },
  computed: {
    ...mapState({
      menu: state => state.menu.menu,
      pages: state => state.page.pages
    })
  },
  methods: {
    getPageName: (menuItem, pages) => {
      const page = pages.find(page => page.id === menuItem.pageId)
      return (page) ? page.name : 'без ссылка на страницу'
    }
  }

}
</script>
