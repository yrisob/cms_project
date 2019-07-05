<template>
  <div>
    <v-breadcrumbs
      :items="breadcrums"
      divider=">"
      class="left-zero-padding"
    ></v-breadcrumbs>

    <v-text-field
      class="h1"
      v-model="pageInfo.page.name"
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
      <v-hover>
        <v-img
          :src="getImage()"
          height="250"
          class="grey darken-4"
          slot-scope="{ hover }"
        >
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
              style="height: 100%;"
            >
              <label color="white" for="input-file" class="input-file-lable">
                <!-- @change="onFilePicked" -->
                <v-icon color="white">add_a_photo</v-icon>
              </label>
              <input
                type="file"
                id="input-file"
                style="display:none"
                ref="fileinput"
                accept="image/*"
                @change="onFilePicked($event)"
              />
            </div>
          </v-expand-transition>
        </v-img>
      </v-hover>
      <v-text-field
        class="h2"
        v-model="pageInfo.page.title"
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
      v-model="pageInfo.content"
      useCustomImageHandler
      @imageAdded="handleImageAdded"
      :editorToolbar="toolbarOptions"
      :editorOptions="editorSettings"
    ></vue-editor>
    <v-btn small v-on:click="saveData()" dark>Сохранить</v-btn>
    <v-btn small v-on:click="clearData()">Отменить изменения</v-btn>
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
    pageInfo: { page: {} },
    content: '<h1>Some initial content</h1>',
    editorSettings: {
      modules: {
        imageDrop: true,
        ImageResize: {}
      }
    },
    breadcrums: [
      {
        text: 'Страницы',
        disable: false,
        href: '#/pages'
      },
      {
        text: '',
        disable: true
      }
    ],
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
  async mounted () {
    this.pageInfo = await this.$store.dispatch('GET_PAGE_ID', this.id)
    this.breadcrums[1].text = `Страницы ${this.id}`
  },
  computed: {

  },
  methods: {
    getHeaderText () {
      console.log((this.query) ? this.query : 'нет переданных параметров')
      return `Страница № ${this.id}`
    },
    getImage () {
      if (!this.pageInfo.page || !this.pageInfo.page.titleImgUrl) {
        return require('../assets/noimage.jpg')
      } else {
        return `${this.$store.getters.BASE_URL}${this.pageInfo.page.titleImgUrl}`
      }
    },
    async onFilePicked (e) {
      const files = e.target.files
      const imgUrl = await this.$store.dispatch('ADD_IMG', files[0])
      this.pageInfo.page.titleImgUrl = imgUrl
    },
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const imgUrl = await this.$store.dispatch('ADD_IMG', file)
      Editor.insertEmbed(cursorLocation, 'image', `${this.$store.getters.BASE_URL}${imgUrl}`)
      resetUploader()
    },
    async clearData () {
      this.pageInfo = await this.$store.dispatch('GET_PAGE_ID', this.id)
    },
    async saveData () {
      const isDataSave = await this.$store.dispatch('UPDATE_PAGE', { id: this.id, pageInfo: this.pageInfo })
      if (isDataSave) {
        this.$router.push('/pages')
      }
    }

  }
}
</script>
