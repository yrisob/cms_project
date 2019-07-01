<template>
  <div>
    <h1>Список страниц ресурса</h1>
    <br />
    <table-with-search
      :tableTitle="tableTitle"
      :searchTitle="titleSearch"
      :headers="headers"
      :search="search"
      :items="blocks"
      :actions="['delete', 'edit']"
      :editHref="editUrl"
      @deleteAction="DELETE_BLOCK"
      @previewAction="previewAction"
    ></table-with-search>
    <br /><br />
    <v-btn :to="" small>+ Добавить станицу</v-btn>
  </div>
</template>

<script>
import TableWithSearch from '../components/TableWithSearch'
import dayjs from 'dayjs'

export default {
  components: {
    TableWithSearch
  },
  data: () => ({
    tableTitle: 'Доступные баннеры',
    titleSearch: 'Найти баннер',
    createPage: false,
    editUrl: '/banner',
    createTitle: 'Создать новый баннер',
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
        convert: (data) => `${this.$store.state.config.baseUrl}/${data}`
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

  },
  computed: {

  },
  methods: {

  }
}
</script>
