import dayjs from 'dayjs'

const pageStore = {
  state: {
    pages: [{
      id: 1,
      name: 'Главная',
      title: 'Немного о компании ',
      createdDate: '21.03.2019 12:13',
      updatedDate: '23.03.2019 12:13'
    },
    {
      id: 2,
      name: 'Диллер онлайн',
      title: 'Проекть NewDol',
      createdDate: '21.03.2019 17:13',
      updatedDate: '23.03.2019 20:13'
    },
    {
      id: 5,
      name: 'Первый интернет',
      title: 'Проект «Первый интернет» для мобильного оператора',
      createdDate: '21.03.2019 15:13',
      updatedDate: '21.03.2019 14:43'
    }
    ]
  },
  getters: {
    getPages: state => {
      return state.pages
    },
    getPage: state => id => {
      return state.pages.find(pg => pg.id === +id)
    }
  },
  mutations: {
    deletePage (state, id) {
      let deletedIndex = state.pages.findIndex(page => +page.id === +id)
      state.pages.splice(deletedIndex, 1)
    },
    addPage (state, page) {
      let pageId = state.pages.sort((x, y) => x.id - y.id)[state.pages.length - 1].id + 1
      page.id = pageId
      page.createdDate = dayjs().format('DD.MM.YYYY HH:mm')
      page.updatedDate = dayjs().format('DD.MM.YYYY HH:mm')
      state.pages.push(page)
    }
  },
  actions: {
    deletePage ({
      commit
    }, id) {
      commit('deletePage', id)
    },
    addPage ({
      commit
    }, page) {
      commit('addPage', page)
    }
  }
}

export default pageStore
