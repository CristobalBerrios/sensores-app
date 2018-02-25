// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import InterceptorApi from '@/services/Interceptor.service'
import moment from 'moment'

Vue.prototype.moment = moment

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvZpEE2xvqfo65_rBDVq_8W-WKP-zBtm8',
    libraries: 'places'
  }
})

Vue.use(Vuetify)

Vue.config.productionTip = false

Vue.http.interceptors.push(InterceptorApi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
