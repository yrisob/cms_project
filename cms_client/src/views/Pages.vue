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
      :editHref="editUrl"
      @deleteAction="DELETE_PAGE"
      @previewAction="previewAction"
    ></table-with-search>
    <br /><br />
    <v-btn
      v-if="!createPage"
      @click="showCreatePage(true)"
      small
      dark
      color="primary"
      >+ Добавить станицу</v-btn
    >
    <create-item-component
      v-if="createPage"
      :createItemTitle="createTitle"
      :textFields="textFields"
      @visualize="createPage = $event"
      @create="ADD_PAGE"
    ></create-item-component>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import TableWithSearch from '../components/TableWithSearch'
import CreateItemComponent from '../components/CreateItemComponent'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['search'],
  components: {
    TableWithSearch,
    CreateItemComponent
  },
  data: () => ({
    tableTitle: 'Старницы ресурса',
    titleSearch: 'Найти страницу',
    createPage: false,
    editUrl: '/page',
    createTitle: 'Создать новую сраницу',
    headers: [
      {
        text: 'Название',
        align: 'left',
        sortable: false,
        value: 'name',
        convert: (data) => data
      },
      {
        text: 'Подпись',
        align: 'right',
        value: 'title',
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
    ],
    textFields: [
      {
        type: 'text',
        propName: 'name',
        title: 'Название',
        value: '',
        validateRule: 'required|min:3'
      },
      {
        type: 'text',
        propName: 'title',
        value: '',
        title: 'Подпись',
        validateRule: { required: true, min: 4 }
      }
    ]
  }),
  mounted () {
    this.$store.dispatch('SET_PAGES')
  },
  computed: {
    ...mapGetters({
      pages: 'PAGES'
    })
  },
  methods: {
    ...mapActions(['DELETE_PAGE', 'ADD_PAGE']),
    showCreatePage (visualizate) {
      this.createPage = visualizate
    },
    previewAction (page) {
      this.$router.push(`${this.editUrl}/${page.id}`)
    }
  }
}
</script>
