<template>
  <v-toolbar fixed dark color="primary" class="toolbar_footer">
    <img :src="require('../assets/logo_64.jpg')" class="logo" />
    <v-toolbar-title>ITHeads</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat @click="changeUser()">{{ getChangeUserName }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>

export default {
  name: 'app-toolbar',
  computed: {
    getChangeUserName () {
      return (this.$store.getters.GET_AUTH) ? 'выйти' : 'войти'
    }
  },
  methods: {
    changeUser () {
      if (this.$store.getters.GET_AUTH) {
        this.$store.dispatch('LOGOUT')
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>
