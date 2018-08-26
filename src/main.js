// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import message from '@/plugins/message/message.js'
import dialog from '@/plugins/dialog/dialog.js'

Vue.config.productionTip = false
Vue.use(message)
Vue.use(dialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
