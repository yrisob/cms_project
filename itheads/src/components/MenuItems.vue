<template>
  <v-list class="container-after-toolbar">
    <template v-for="menuItem in orderMenu">
      <v-list-tile
        v-if="menuItem.pageId"
        :to="'/' + menuItem.pageId"
        :key="menuItem.id"
      >
        <v-list-tile-title>{{ menuItem.name }}</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        v-if="
          !menuItem.path && menuItem.children && menuItem.children.length > 0
        "
        value="t"
        :key="menuItem.id"
      >
        <template v-slot:activator>
          <v-list-tile :key="menuItem.id">
            <v-list-tile-title>{{ menuItem.name }}</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile
          v-for="submenuItem in orderedChildren(menuItem)"
          :key="submenuItem.id"
          :to="'/' + submenuItem.pageId"
        >
          <v-list-tile-title
            ><v-flex offset-lg1 offset-md1 offset-xs1>{{
              submenuItem.name
            }}</v-flex></v-list-tile-title
          >
        </v-list-tile>
      </v-list-group>
    </template>
  </v-list>
</template>

<script>
import * as _ from 'lodash'
export default {
  name: 'menu-items',
  props: ['menu'],
  computed: {
    orderMenu: function () {
      return _.orderBy(this.menu, 'orderNumber')
    }
  },
  methods: {
    orderedChildren (menuItem) {
      return _.orderBy(menuItem.children, 'orderNumber')
    }
  }
}
</script>
