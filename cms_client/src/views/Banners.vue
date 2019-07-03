<template>
  <div>
    <h1>Список страниц ресурса</h1>
    <br />
    <table-with-search
      :tableTitle="tableTitle"
      :searchTitle="titleSearch"
      :headers="headers"
      :search="getSearchText"
      :items="blocks"
      :actions="['delete', 'edit']"
      :editHref="editUrl"
      @deleteAction="DELETE_BLOCK"
      @previewAction="previewAction"
    ></table-with-search>
    <br /><br />
    <v-btn @click="previewAction" small>Создать новый баннер</v-btn>
  </div>
</template>

<script>
import TableWithSearch from '../components/TableWithSearch'
import dayjs from 'dayjs'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    TableWithSearch
  },
  props: ['search'],
  data: () => ({
    tableTitle: 'Доступные баннеры',
    titleSearch: 'Найти баннер',
    createPage: false,
    editUrl: '/banner',
    createTitle: 'Создать новый баннер',
    baseUrl: '',
    headers: [
      {
        text: 'Название',
        align: 'left',
        sortable: false,
        value: 'name',
        convert: (data) => data
      },
      {
        text: 'Описание',
        align: 'right',
        value: 'content',
        convert: (data) => data
      },
      {
        text: 'Изображение',
        align: 'right',
        value: 'imgUrl',
        isImage: true,
        imgWidth: '40px',
        convert: (data) => data
      },
      {
        text: 'Приоритет',
        align: 'right',
        value: 'index',
        convert: (data) => data
      },
      {
        text: 'Регистрация',
        align: 'right',
        value: 'createdDate',
        convert: (data) => dayjs(data).format('DD.MM.YYYY HH:mm')
      },
      {
        text: 'Изменения',
        align: 'right',
        value: 'updatedDate',
        convert: (data) => dayjs(data).format('DD.MM.YYYY HH:mm')
      },
      {
        text: 'Действия',
        align: 'right',
        action: true,
        value: 'id'
      }
    ]
  }),
  mounted () {
    const blocks = this.$store.getters.BLOCKS

    if (!blocks || blocks.length === 0) {
      this.$store.dispatch('SET_BLOCK')
    }
  },
  computed: {
    ...mapGetters({
      blocks: 'BLOCKS'
    }),
    getSearchText: {
      get () {
        if (this.search) {
          return '' + this.search
        }
        return ''
      },
      set (newValue) {
        this.search = newValue
      }
    }
  },
  methods: {
    ...mapActions(['DELETE_BLOCK']),
    showCreatePage (visualizate) {
      this.createPage = visualizate
    },
    previewAction (block) {
      this.$router.push(`${this.editUrl}/${(block && block.id) ? block.id : 'new'}`)
    }
  }
}
</script>
