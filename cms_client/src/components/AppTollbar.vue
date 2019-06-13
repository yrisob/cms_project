<template>
     <v-toolbar fixed dark  class="toolbar_footer">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat href="/#/login">Вход</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat href="/#/about">О проекте</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  name: 'app-toolbar'
}
</script>
