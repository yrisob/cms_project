<template>
  <div>
    <h2>Состав меню</h2>
    <br />
    <menu-tree
      :menuItems="menu"
      :pages="pages"
      :level="0"
      @showDeleteWarning="dialog = true"
    ></menu-tree>
    <v-dialog v-model="dialog" persistent max-width="30%">
      <v-card>
        <v-card-title class="headline"
          >Невозможно удалить пункт меню с вложением.</v-card-title
        >
        <v-card-text
          >Удаление пунктов меню с вложением возможно только после очистки всех
          вложенных пунктов.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" flat @click="dialog = false">Понятно</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    dialog: false
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
