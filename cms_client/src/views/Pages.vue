<template>
  <div>
    <h1>Список страниц ресурса</h1>
    <br />
    <table-with-search
      :tableTitle="tableTitle"
      :searchTitle="titleSearch"
      :headers="headers"
      :search="search"
      :items="pages"
      :actions="['delete', 'edit']"
      :editHref="'/page'"
      @deleteAction="deletePage"
    ></table-with-search>
    <br /><br />
    <v-btn v-if="!createPage" @click="showCreatePage(true)" small
      >+ Добавить станицу</v-btn
    >
  </div>
</template>

<script>
import TableWithSearch from '../components/TableWithSearch'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['search'],
  components: {
    TableWithSearch
  },
  data: () => ({
    tableTitle: 'Старницы ресурса',
    titleSearch: 'Найти страницу',
    createPage: false,
    headers: [
      {
        text: 'Название',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      {
        text: 'Подпись',
        align: 'right',
        value: 'title'
      },
      {
        text: 'Регистрация',
        align: 'right',
        value: 'createdDate'
      },
      {
        text: 'Изменения',
        align: 'right',
        value: 'updatedDate'
      },
      {
        text: 'Действия',
        align: 'right',
        action: true,
        value: 'id'
      }
    ]
  }),
  computed: {
    ...mapGetters({
      pages: 'getPages'
    })
  },
  methods: {
    ...mapActions(['deletePage']),
    showCreatePage (visualizate) {
      this.createPage = visualizate
    }
  }
}
</script>
