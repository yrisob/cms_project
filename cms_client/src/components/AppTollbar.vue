<template>
     <v-toolbar fixed dark  class="toolbar_footer">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
         <v-btn flat @click="changeUser()">{{getChangeUserName}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  name: 'app-toolbar',
  computed: {
    getChangeUserName () {
      return (this.$store.getters.getAuthUser) ? 'выйти' : 'войти'
    }
  },
  methods: {
    changeUser () {
      if (this.$store.getters.getAuthUser) {
        this.$store.state.authUser = null
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>
