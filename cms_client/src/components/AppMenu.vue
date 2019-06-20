<template>
      <v-navigation-drawer
      stateless
      value="true"
      hide-overlay
      fixed
      class="inherit-height"
    >
      <v-list class="container-after-toolbar">
        <template v-for="(menuItem, index) in menuItems">
          <v-list-tile v-if="menuItem.path" :to="menuItem.path" :key="index">
            <v-list-tile-action>
              <v-icon >{{menuItem.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{menuItem.name}}</v-list-tile-title>
          </v-list-tile>

          <v-list-group
           v-if="!(menuItem.path) && menuItem.items && (menuItem.items.length > 0)"
           prepend-icon="archive"
           value="t"
          :key="index"
          >
            <template v-slot:activator>
              <v-list-tile :key="index">
                <v-list-tile-title>{{menuItem.name}}</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile
              v-for="(submenuItem, i) in menuItem.items"
              :key="i"
              :to="submenuItem.path"
            >
              <v-list-tile-title><v-flex offset-lg3 offset-md3 offset-xs3>{{submenuItem.name}}</v-flex></v-list-tile-title>
              <v-list-tile-action right>
                <v-flex>
                  <v-icon right v-text="submenuItem.icon"></v-icon>
                </v-flex>
              </v-list-tile-action>
            </v-list-tile>

          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'app-menu',
  data: () => ({
    admins: [
      ['Страницы', 'find_in_page'],
      ['Меню', 'menu'],
      ['Банеры', 'dashboard']],
    menuItems: [
      { name: 'Главная', icon: 'home', path: '/' },
      { name: 'Пользователи', icon: 'account_circle', path: '/users' },
      { name: 'Контент',
        icon: 'archive',
        items: [
          { name: 'Страницы', icon: 'find_in_page', path: '/pages' },
          { name: 'Меню', icon: 'menu', path: '/menu' },
          { name: 'Банеры', icon: 'dashboard', path: '/banners' }
        ] }
    ]
  }),
  computed: {

  },
  methods: {
  }
}
</script>
