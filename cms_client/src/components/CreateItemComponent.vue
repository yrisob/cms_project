<template>
  <div>
    <h2>{{ createItemTitle }}</h2>
    <br />
    <form>
      <template v-for="(textField, index) in textFields">
        <v-text-field
          v-if="textField.type != 'password'"
          :key="index"
          v-model="textField.value"
          v-validate="textField.validateRule"
          :error-messages="errors.collect(textField.propName)"
          v-bind:data-vv-name="textField.propName"
          type="text"
          counter
          v-bind:label="textField.title"
        >
        </v-text-field>

        <v-text-field
          v-if="textField.type === 'password'"
          :key="index"
          v-model="textField.value"
          data-vv-as="field"
          v-validate="textField.validateRule"
          :error-messages="errors.collect(textField.propName)"
          :type="show ? 'text' : 'password'"
          counter
          v-bind:label="textField.title"
          v-bind:data-vv-name="textField.propName"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          @click:append="show = !show"
        ></v-text-field>
      </template>
      <v-btn small @click="save()" dark>Создать</v-btn>
      <v-btn small @click="cancel()">Отменить</v-btn>
    </form>
  </div>
</template>

<script>
export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: ['createItemTitle', 'textFields'],
  data: () => ({
    show: false
  }),
  mounted () {
    // this.$validator.localize('ru', this.dictionary)
  },
  methods: {
    async validate () {
      return this.$validator.validateAll()
    },
    cancel () {
      if (this.textFields && this.textFields.length > 0) {
        this.textFields.forEach(element => {
          element.value = ''
        })
        this.$validator.reset()
        this.$emit('visualize', false)
      }
    },
    async save () {
      if (this.textFields && this.textFields.length > 0) {
        const validator = await this.validate()
        if (validator) {
          let item = {}
          for (let i = 0; i < this.textFields.length; i++) {
            item[this.textFields[i].propName] = this.textFields[i].value
          }
          this.$emit('create', item)
        }
      }
    }
  }

}
</script>
