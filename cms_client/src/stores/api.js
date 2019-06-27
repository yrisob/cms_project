import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

const apiCaller = {
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
