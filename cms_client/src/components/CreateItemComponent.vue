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
          v-validate="textFields.validateRule"
          :error-messages="errors.collect(textField.propName)"
          data-vv-name="textField.propName"
          counter
          v-bind:label="textField.title"
        >
        </v-text-field>

        <v-text-field
          v-if="textField.type === 'password'"
          :key="index"
          v-model="textField.value"
          data-vv-as="field"
          v-validate="textFields.validateRule"
          :error-messages="errors.collect(textField.propName)"
          counter
          v-bind:label="textField.title"
          data-vv-name="textField.propName"
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
    this.$validator.localize('ru', this.dictionary)
  },
  methods: {
    cancel () {
      if (this.textFields && this.textFields.length > 0) {
        this.textFields.forEach(element => {
          element.value = ''
        })
        this.$validator.reset()
        this.$emit('visualize', false)
      }
    },
    save () {
      if (this.textFields && this.textFields.length > 0) {
        this.$validator.validateAll().then(response => {
          if (response) {
            console.log(response)
            let item = {}
            for (let i = 0; i < this.textFields.length; i++) {
              item[this.textFields[i].propName] = this.textFields[i].value
            }
            this.$emit('create', item)
            this.cancel()
          }
        })
      }
    }
  }

}
</script>
