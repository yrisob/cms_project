import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import VeeValidate from 'vee-validate'

Vue.use(Vuetify, {
  theme: {
    'primary': '#388e3c',
    'secondary': '#424242',
    'accent': '#82B1FF',
    'error': '#FF5252',
    'info': '#2196F3',
    'success': '#4CAF50',
    'warning': '#FB8C00'
  },
  options: {
    customProperties: true
  },
  iconfont: 'md'
})

Vue.use(VeeValidate)
