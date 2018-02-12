// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import axios from 'axios'
import Vuex from 'vuex'
import VueCordova from 'vue-cordova'
import Router from 'vue-router'
import 'muse-ui/dist/muse-ui.css'

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(Router)
Vue.use(Vuex)

Vue.use(VueCordova, {
  optionTestKey: 'optionTestValue'
})

Vue.prototype.$http = axios

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://127.0.0.1:8082'

// add cordova.js only if serving the app through file://
//document.addEventListener('deviceready', function() {

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  data: function () {
    return {
      cordova: Vue.cordova
    }
  }
})
 //window.navigator.splashscreen.hide()
//}, false);