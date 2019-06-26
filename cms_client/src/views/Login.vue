<template>
  <div>
    <h1>Войдите под своим логином</h1>
    <form>
      <v-text-field
        v-model="email"
        v-validate="'required|email'"
        :error-messages="errors.collect('email')"
        label="E-mail"
        data-vv-name="email"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show ? 'visibility' : 'visibility_off'"
        :rules="[passwordRule.required, passwordRule.min]"
        :type="show ? 'text' : 'password'"
        name="input-10-1"
        label="Пароль"
        hint="At least 8 characters"
        counter
        @click:append="show = !show"
        @keyup.enter="submit"
      ></v-text-field>

      <v-btn @click="submit" dark>Войти</v-btn>
      <v-btn @click="clear">Очистить</v-btn>
    </form>
  </div>
</template>

<script>
export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: ['endpoint'],
  data: () => ({
    show: false,
    email: '',
    password: '',
    passwordRule: {
      required: value => !!value || 'Обязательный для заполнения',
      min: v => v.length >= 4 || 'Пароль не может содержать меньше 4 символов'
    }
  }),
  mounted () {
    this.$validator.localize('ru', this.dictionary)
  },
  methods: {
    clear () {
      this.email = ''
      this.password = ''
      this.$validator.reset()
    },
    submit () {
      this.$validator.validateAll().then(response => {
        if (response) {
          if (!this.$store.getters.getAuthUser) {
            this.$store.dispatch('login', '123')
            if (this.endpoint) {
              this.$router.push({ path: this.endpoint })
            } else {
              this.$router.push({ path: '/' })
            }
          }
        }
      })
    }
  }
}
</script>
