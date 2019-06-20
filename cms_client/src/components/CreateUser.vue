<template>
<div>
    <h2>Добавление пользователя</h2>
    <br>
    <form>
      <v-text-field
        v-model="name"
        v-validate="'required|min:3'"
        :error-messages="errors.collect('name')"
        counter
        label="Имя"
        data-vv-name="name"
        required
      ></v-text-field>
      <v-text-field
        v-model="email"
        v-validate="'required|email'"
        :error-messages="errors.collect('email')"
        label="E-mail"
        data-vv-name="email"
        required
      ></v-text-field>
      <v-text-field
        v-model="phone"
        v-validate="'required|digits:11'"
        name="digits_field"
        counter
        :error-messages="errors.collect('phone')"
        label="Телефон"
        data-vv-name="phone"
        type="text"
        required
      ></v-text-field>
      <!-- :rules="[phoneRule.digital, phoneRule.lengthRule]" -->
       <v-text-field
              v-model="password"
              :append-icon="show ? 'visibility' : 'visibility_off'"
              v-validate="'required|min:8'"
              data-vv-as="field"
              :error-messages="errors.collect('password')"
              :type="show ? 'text' : 'password'"
              name="password"
              label="Пароль"
              hint="At least 8 characters"
              counter
              @click:append="show = !show"
              @keyup.enter="saveUser()"
            ></v-text-field>
            <br>
      <v-btn small @click="saveUser()" dark>Создать</v-btn>
      <v-btn small @click="cancel()">Отменить</v-btn>
    </form>
</div>
</template>
<script>
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    email: '',
    name: '',
    phone: '',
    password: '',
    show: false,
    role: null,
    passwordRule: {
      required: value => !!value || 'Обязательный для заполнения',
      min: v => v.length >= 4 || 'Пароль не может содержать меньше 4 символов'
    },
    phoneRule: {
      digital: value => (/^\d+$/.test(value)) || 'Должны быть только цифры',
      lengthRule: value => (value + '').length === 11 || 'Телефон вводится без + только 11 цифр'
    }
  }),
  mounted () {
    this.$validator.localize('ru', this.dictionary)
  },
  methods: {
    cancel () {
      this.email = ''
      this.name = ''
      this.phone = ''
      this.password = ''
      this.$validator.reset()
      this.$emit('visualize', false)
    },
    saveUser () {
      this.$validator.validateAll().then(response => {
        if (response) {
          this.$emit('createUser', { email: this.email, name: this.name, phone: this.phone, password: this.password })
          this.$emit('visualize', false)
        }
      })
    }
  }
}
</script>
