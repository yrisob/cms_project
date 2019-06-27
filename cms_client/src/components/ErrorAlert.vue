<template>
  <v-alert v-model="alert" dismissible type="error" @click="close()">
    {{ error }}
  </v-alert>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    alert: false
  }),
  computed: {
    ...mapGetters({
      error: 'error'
    })
  },
  mounted () {
    this.$store.subscribe((mutations, state) => {
      switch (mutations.type) {
        case 'SET_ERROR':
          this.alert = !!state.error.message
          break
      }
    })
  },
  methods: {
    close () {
      this.$store.dispatch('SET_ERROR', '')
    }
  }
}
</script>
