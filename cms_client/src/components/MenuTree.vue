<template>
  <div>
    <template v-for="menuItem in menuItems">
      <menu-item
        :level="level"
        :selectItems="pages"
        :menuItem="menuItem"
        :key="`item${menuItem.id}`"
        :parentId="parentId"
        @showDeleteWarning="showWarning()"
      ></menu-item>
      <menu-tree
        v-if="menuItem.children && menuItem.children.length > 0"
        :menuItems="menuItem.children"
        :pages="pages"
        :level="level + 1"
        :key="`tree${menuItem.id}`"
        :parentId="menuItem.id"
      ></menu-tree>
    </template>
    <menu-item
      :level="level"
      :selectItems="pages"
      :menuItem="{}"
      :parentId="parentId"
      @showDeleteWarning="showWarning()"
    ></menu-item>
  </div>
</template>
<script>
import MenuItem from './MenuItem'

export default {
  components: {
    MenuItem
  },
  name: 'menu-tree',
  props: ['menuItems', 'pages', 'level', 'parentId'],
  data: () => ({
  }),
  methods: {
    showWarning () {
      this.$emit('showDeleteWarning')
    }
  }
}
</script>
