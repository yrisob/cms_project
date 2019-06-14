<template>
    <h1>{{getHeaderText()}}</h1>
</template>

<script>
export default {
  props: ['id', 'query'],
  data: () => ({
  }),
  methods: {
    getHeaderText () {
      console.log((this.query) ? this.query : 'нет переданных параметров')
      return `Страница № ${this.id}`
    }

  }
}
</script>
