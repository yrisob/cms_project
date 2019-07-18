<template>
  <div>
    <h2>{{ createItemTitle }}</h2>
    <br />
    <form>
      <template v-for="(textField, index) in textFields">
        <v-text-field
          v-if="textField.type === 'text'"
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

        <v-textarea
          v-if="textField.type === 'textarea'"
          v-bind:label="textField.title"
          :key="index"
          v-model="textField.value"
          v-validate="textField.validateRule"
          :error-messages="errors.collect(textField.propName)"
          v-bind:data-vv-name="textField.propName"
          counter
        ></v-textarea>

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

        <v-text-field
          v-if="textField.type === 'number'"
          :key="index"
          v-model.number="textField.value"
          v-validate="textFields.validateRule"
          :error-messages="errors.collect(textField.propName)"
          type="number"
          counter
          v-bind:label="textField.title"
        ></v-text-field>

        <v-layout column v-if="textField.type === 'image'" :key="index">
          <v-hover>
            <v-img
              slot-scope="{ hover }"
              :src="getImage(textField)"
              aspect-ratio="1.7"
            >
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  <label
                    color="white"
                    for="input-file"
                    class="input-file-lable"
                  >
                    <!-- @change="onFilePicked" -->
                    <v-icon color="white">add_a_photo</v-icon>
                  </label>
                  <input
                    type="file"
                    id="input-file"
                    style="display:none"
                    ref="fileinput"
                    accept="image/*"
                    @change="onFilePicked(textField, $event)"
                  />
                </div>
              </v-expand-transition>
            </v-img>
          </v-hover>
        </v-layout>
      </template>
      <v-btn small @click="save()" dark color="primary">Создать</v-btn>
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
    show: false,
    imageName: '',
    imageFile: '',
    imageUrl: ''
  }),
  mounted () {
    // this.$validator.localize('ru', this.dictionary)
  },
  methods: {
    pickFile () {
      this.$refs.fileinput.click()
    },
    async onFilePicked (textField, e) {
      const files = e.target.files
      const imgUrl = await this.$store.dispatch('ADD_IMG', files[0])
      textField.value = imgUrl
    },
    getImage (textField) {
      if (!textField.value) {
        return require('../assets/noimage.jpg')
      } else {
        return `${this.$store.getters.BASE_URL}${textField.value}`
      }
    },
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
          for (const textField in this.textFields) {
            item[textField.propName] = (textField.type !== 'number') ? textField.value : parseFloat(textField.value)
          }
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
