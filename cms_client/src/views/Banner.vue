<template>
  <div>
    <v-breadcrumbs
      :items="breadcrums"
      divider=">"
      class="left-zero-padding"
    ></v-breadcrumbs>
    <br />
    <create-item-component
      v-if="true"
      :createItemTitle="getTitleText"
      :textFields="textFields"
      @visualize="createPage = $event"
      @create="createBanner"
    ></create-item-component>
  </div>
</template>

<script>
import CreateItemComponent from '../components/CreateItemComponent'

export default {
  components: {
    CreateItemComponent
  },
  props: ['id'],
  data: () => ({
    createTitle: 'Создать новую сраницу',
    breadcrums: [
      {
        text: 'Баннеры',
        disable: false,
        href: '#/banners'
      },
      {
        text: '',
        disable: true
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
        type: 'image',
        propName: 'imgUrl',
        value: '',
        title: 'изображение'
      },
      {
        type: 'textarea',
        propName: 'content',
        value: '',
        title: 'Описание',
        validateRule: 'required|min:20'
      },
      {
        type: 'numeric',
        propName: 'index',
        value: '',
        title: 'Приоритет',
        validateRule: { required: true, regex: /^([0-9]+)$/ }
      }
    ]

  }),
  async mounted () {
    if (!isNaN(this.id)) {
      this.breadcrums[1].text = `Баннер №${this.id}`
      const block = await this.$store.dispatch('GET_BLOCK_BY_ID', +this.id)
      this.textFields.forEach((field, index, arr) => { arr[index].value = block[field.propName] })
    } else {
      this.breadcrums[1].text = 'Создание нового баннера'
    }
  },
  computed: {
    getTitleText () {
      if (!isNaN(this.id)) {
        return `Редактирование баннера №${this.id}`
      } else {
        return 'Создание нового баннера'
      }
    }
  },
  methods: {
    async createBanner (item) {
      let result = false
      if (isNaN(+this.id)) {
        result = await this.$store.dispatch('ADD_BLOCK', item)
      } else {
        result = await this.$store.dispatch('UPDATE_BLOCK', { id: +this.id, block: item })
      }
      if (result) {
        this.$router.push('/banners')
      }
    }
  }
}
</script>
