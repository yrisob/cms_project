<template>
  <div>
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
  data: () => ({
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
  methods: {
    saveData: function () {
      console.log(this.content)
    },
    handleSavingContent: function (contentsToBeSaved) {
      console.log(contentsToBeSaved)
    }
  }
}
</script>
