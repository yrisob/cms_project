import axios from 'axios'

const baseUrl = 'http://localhost:3000/'

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

const apiCaller = {
  config: {
    baseURL: baseUrl,
    upload: (img) => {
      return instance.post('upload', img)
    }
  },
  auth: {
    login: (data) => {
      return instance.post('auth/login', data)
    }
  },
  users: {
    all: () => {
      return instance.get('user')
    },
    getById: id => {
      return instance.get(`user/${id}`)
    },
    add: (data) => {
      return instance.post('user', data)
    },
    delete: (id) => {
      return instance.delete(`user/${id}`)
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
    }
  },
  blocks: {
    all: () => {
      return instance.get('block')
    },
    add: (data) => {
      return instance.post('block', data)
    },
    getByID: (id) => {
      return instance.get(`block/${id}`)
    },
    delete: (id) => {
      return instance.delete(`block/${id}`)
    }
  },

  setAuthorization: (token) => {
    instance.defaults.headers.common = {
      'Authorization': `Bearer ${token}`
    }
  },

  deleteAuthorization: () => {
    localStorage.token = ''
    delete instance.defaults.headers.common['Authorization']
  }

}

export default apiCaller
