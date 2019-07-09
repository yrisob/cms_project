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
    },
    getById: (id) => {
      return instance.get(`page/${id}`)
    },
    update: (id, pageInfo) => {
      return instance.patch(`page/${id}`, pageInfo)
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
    },
    update: (id, block) => {
      return instance.patch(`block/${id}`, block)
    }
  },

  menu: {
    all: () => {
      return instance.get('menu')
    },
    add: (data) => {
      return instance.post(data)
    },
    update: (id, menu) => {
      return instance.patch(`menu/${id}`, menu)
    },
    delete: (id) => {
      return instance.delete(`menu/${id}`)
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
