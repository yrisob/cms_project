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
        :prepend-icon="!addSunMenu ? 'add' : 'remove'"
        class="caption"
        v-model="menuItem.name"
        label="Название меню"
        solo
        @click:prepend="addSunMenu = !!menuItem.id ? !addSunMenu : false"
        @input="changeFields"
      ></v-text-field>
    </v-flex>
    <v-flex md6 lg6>
      <v-select
        class="caption"
        :items="selectItems"
        label="Выбрать страницу"
        item-text="name"
        item-value="id"
        v-model="menuItem.pageId"
        :append-outer-icon="readonly && !!menuItem.id ? 'backspace' : 'save'"
        solo
        @click:append-outer="transformMenu"
        @input="changeFields"
      ></v-select>
    </v-flex>
    <menu-item
      v-if="addSunMenu"
      :level="level + 1"
      :selectItems="selectItems"
      :menuItem="{}"
      :parentId="menuItem.id"
    ></menu-item>
  </v-layout>
</template>

<script>
export default {
  name: 'menu-item',
  props: ['level', 'menuItem', 'selectItems', 'parentId'],
  data: () => ({
    readonly: true,
    addSunMenu: false,
    defaultMenuItemValue: {}
  }),
  mounted () {
    this.defaultMenuItemValue = JSON.parse(JSON.stringify(this.menuItem))
  },

  methods: {
    changeFields () {
      console.log('change fields')
      if (this.menuItem.name !== this.defaultMenuItemValue.name || this.menuItem.pageId !== this.defaultMenuItemValue.pageId) {
        this.readonly = false
      } else {
        this.readonly = true
      }
    },
    async transformMenu () {
      if (this.readonly && !!this.menuItem.id) {
        this.$store.dispatch('DELETE', this.menuItem.id)
      } else {
        this.menuItem.parentId = this.parentId
        if (this.menuItem.id) {
          this.readonly = await this.$store.dispatch('UPDATE', { id: this.menuItem.id, menuItem: this.menuItem })
        } else {
          this.readonly = await this.$store.dispatch('ADD', this.menuItem)
        }
        if (this.readonly) {
          this.addSunMenu = false
        }
      }
    }
  }

}
</script>
