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
      @deleteAction="deletePage"
      @previewAction="previewAction"
    ></table-with-search>
    <br /><br />
    <v-btn v-if="!createPage" @click="showCreatePage(true)" small
      >+ Добавить станицу</v-btn
    >
    <create-item-component
      v-if="createPage"
      :createItemTitle="createTitle"
      :textFields="textFields"
      @visualize="createPage = $event"
      @create="addPage"
    ></create-item-component>
  </div>
</template>

<script>
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
    ],
    textFields: [
      {
        type: 'text',
        propName: 'name',
        title: 'Название',
        value: '',
        validateRule: { required: true, min: 3 }
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
  computed: {
    ...mapGetters({
      pages: 'getPages'
    })
  },
  methods: {
    ...mapActions(['deletePage', 'addPage']),
    showCreatePage (visualizate) {
      this.createPage = visualizate
    },
    previewAction (page) {
      this.$router.push(`${this.editUrl}/${page.id}`)
    }
  }
}
</script>
