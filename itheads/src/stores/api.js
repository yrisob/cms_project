import axios from 'axios'

const BASEURL = 'http://localhost:3000/'

const instance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

const apiCaller = {
  config: {
    baseURL: BASEURL,
    upload: (img) => {
      return instance.post('img', img, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  },
  pages: {
    all: () => {
      return instance.get('page')
    },
    add: (data) => {
      return instance.post('page', data)
    },
    delete: (id) => {
      return instance.delete(`page/${id}`)
    },
    getById: (id) => {
      return instance.get(`page/${id}`)
    },
    update: (id, pageInfo) => {
      return instance.patch(`page/${id}`, pageInfo)
    }
  },
  menu: {
    all: () => {
      return instance.get('menu')
    },
    add: (data) => {
      return instance.post('menu', data)
    },
    update: (id, menu) => {
      return instance.patch(`menu/${id}`, menu)
    },
    delete: (id) => {
      return instance.delete(`menu/${id}`)
    }
  }

}

export default apiCaller
