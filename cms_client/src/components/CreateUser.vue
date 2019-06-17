<template>
<div>
    <h1>Добавление пользователя</h1>
    <div right>
        <v-btn small @click="saveUser()" dark>Создать</v-btn>
        <v-btn small @click="cancel()">Отменить</v-btn>
    </div>
</div>
</template>
<script>
export default {
  methods: {
    cancel () {
      this.$emit('interface', false)
    },
    saveUser () {
      console.log('create user')
      this.$emit('interface', false)
    }
  }
}
</script>
