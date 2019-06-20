<template>
  <div>
    <h2>Создание новой страницы</h2>
    <br>
    <form>
        <v-text-field v-model="name"
        v-validate="'required|min:3'"
        :error-messages="error.collect('name')"
        counter
        label="Название"
        data-vv-name="name"
        >
        </v-text-field>
        <v-text-field v-model="title" v-validate="'reqired|min:4'"
        :error-messages="error.collect('title')" counter
        label="Подпись" data-vv-name="title">
        </v-text-field>
        <v-btn small @click="savePage()" dark>Создать</v-btn>
        <v-btn small @click="cancel()">Отменить</v-btn>
  </div>
</template>

<script>
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    name: '',
    title: ''
  }),
  mounted () {
    this.$validator.localize('ru', this.dictionary)
  },
  methods: {
    cancel () {
      this.name = ''
      this.title = ''
      this.$validator.reset()
    }
  }

}
</script>
