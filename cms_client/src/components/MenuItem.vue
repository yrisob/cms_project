<template>
  <v-layout row wrap>
    <v-flex
      :class="
        level
          ? `md${6 - level} lg${6 - level} offset-md${level} offset-lg${level} `
          : 'md6 lg6'
      "
    >
      <v-text-field
        :prepend-icon="!addSubmenu ? 'add' : 'remove'"
        class="caption"
        v-model="menuItem.name"
        label="Название меню"
        solo
        @click:prepend="addSubmenu = !!menuItem.id ? !addSubmenu : false"
        @input="changeFields"
      ></v-text-field>
    </v-flex>
    <v-flex md2 lg2>
      <v-text-field
        v-model="menuItem.orderNumber"
        label="Порядок"
        type="number"
        solo
        @input="changeFields"
      ></v-text-field>
    </v-flex>
    <v-flex md4 lg4>
      <v-select
        class="caption"
        :items="selectItems"
        label="Выбрать страницу"
        item-text="name"
        item-value="id"
        v-model="menuItem.pageId"
        :append-outer-icon="
          isNotChanged && !!menuItem.id ? 'backspace' : 'save'
        "
        solo
        @click:append-outer="transformMenu"
        @input="changeFields"
      ></v-select>
    </v-flex>
    <menu-item
      v-if="addSubmenu"
      :level="level + 1"
      :selectItems="selectItems"
      :menuItem="{}"
      :parentId="menuItem.id"
      @closeSubMenu="addSubmenu = false"
    ></menu-item>
  </v-layout>
</template>

<script>
export default {
  name: 'menu-item',
  props: ['level', 'menuItem', 'selectItems', 'parentId'],
  data: () => ({
    isNotChanged: true,
    addSubmenu: false,
    defaultMenuItemValue: {}
  }),
  mounted () {
    this.defaultMenuItemValue = JSON.parse(JSON.stringify(this.menuItem))
  },

  methods: {

    changeFields () {
      if (this.menuItem.name !== this.defaultMenuItemValue.name || this.menuItem.pageId !== this.defaultMenuItemValue.pageId || +this.menuItem.orderNumber !== +this.defaultMenuItemValue.orderNumber) {
        this.isNotChanged = false
      } else {
        this.isNotChanged = true
      }
    },
    async transformMenu () {
      if (this.isNotChanged && !!this.menuItem.id) {
        if (this.menuItem.children && this.menuItem.children.length > 0) {
          this.$emit('showDeleteWarning')
        } else {
          this.$store.dispatch('DELETE', this.menuItem.id)
        }
      } else {
        this.menuItem.parentId = this.parentId
        if (this.menuItem.id) {
          this.menuItem.orderNumber = +this.menuItem.orderNumber
          this.isNotChanged = await this.$store.dispatch('UPDATE', { id: this.menuItem.id, menuItem: this.menuItem })
        } else {
          this.menuItem.orderNumber = +this.menuItem.orderNumber
          this.isNotChanged = await this.$store.dispatch('ADD', this.menuItem)
          this.$emit('closeSubMenu')
        }
        if (this.isNotChanged) {
          this.addSubmenu = false
        }
      }
    }
  }

}
</script>
