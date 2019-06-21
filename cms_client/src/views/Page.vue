<template>
  <div>
    <v-text-field
      class="h1"
      v-model="page.name"
      v-validate="'required|min:3'"
      :error-messages="errors.collect('name')"
      data-vv-name="name"
      type="text"
      counter
      label="Название"
    >
    </v-text-field>
    <br />
    <v-card>
      <v-img
        :src="require('../assets/logo.svg')"
        height="250"
        class="grey darken-4"
      ></v-img>
      <v-text-field
        class="h2"
        v-model="page.title"
        v-validate="'required|min:4'"
        :error-messages="errors.collect('title')"
        data-vv-name="title"
        type="text"
        solo
        counter
        label="Подпись"
      >
      </v-text-field>
    </v-card>
    <br />
    <vue-editor
      v-model="content"
      :editorToolbar="toolbarOptions"
      :editorOptions="editorSettings"
    ></vue-editor>
    <v-btn small v-on:click="saveData()">Сохранить</v-btn>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from '@appsflare/quill-image-resize-module'

Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/ImageResize', ImageResize)

export default {
  components: {
    VueEditor
  },
  props: ['id', 'query'],
  data: () => ({
    page: {},
    content: '<h1>Some initial content</h1>',
    editorSettings: {
      modules: {
        imageDrop: true,
        ImageResize: {}
      }
    },
    toolbarOptions: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'font': ['Sans Serif', 'roboto', 'mirza', 'arial'] }],
      [{ 'align': [] }],

      ['clean'] // remove formatting button
    ]
  }),
  mounted () {
    this.page = this.$store.getters.getPage(this.id)
  },
  computed: {

  },
  methods: {
    getHeaderText () {
      console.log((this.query) ? this.query : 'нет переданных параметров')
      return `Страница № ${this.id}`
    }

  }
}
</script>
