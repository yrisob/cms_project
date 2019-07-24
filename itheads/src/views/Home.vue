<template>
  <div class="article">
    <div class="wrapper" :style="{ background: titleImg }">
      <div class="wrapperText">
        <h1>
          <mark>{{ page && page.page ? page.page.title : "" }}</mark>
        </h1>
        <p id="author">
          <mark>{{ page && page.page ? page.page.name : "" }}</mark>
        </p>
        <div id="accountDetail" class="accountInfo">
          <div class="header">
            <h2><mark>Lina Regental</mark></h2>
            <p><mark>Producer & Author</mark></p>
          </div>
          <div class="profilePicture"></div>
          <p class="profileText">
            Chef, Community Volunteer, Conveyor of Messages, Electro Producer,
            Scapegoat. Is that a double rainbow? D:.
          </p>
          <button>Check me out ></button>
        </div>
      </div>
    </div>
    <!--The Text is generated with hipsum.co :) Check it out! -->
    <div class="articleText">
      <div v-html="page ? page.content : ''"></div>
    </div>
  </div>
</template>

<script>
import apiCaller from '../stores/api'

export default {
  props: ['id'],
  data: () => ({
    page: undefined
  }),
  async mounted () {
    this.page = await this.$store.dispatch('GET_PAGE_ID', this.id)
  },
  computed: {
    titleImg: function () {
      if (this.page && this.page.page) {
        const imgPath = `${apiCaller.config.baseURL}${this.page.page.titleImgUrl}`
        const style = `url(${imgPath}
          ) no-repeat center center fixed`
        return style
      }
      return ''
    }
  },
  watch: {
    id: async function (newVal, oldVal) {
      this.page = await this.$store.dispatch('GET_PAGE_ID', newVal)
    }
  }
}

</script>
