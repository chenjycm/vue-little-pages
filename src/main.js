import Vue from 'vue'
import App from './App.vue'
import pages from './plugins/vue-little-pages'
import './assets/global.css'

Vue.config.productionTip = false
Vue.use(pages)
new Vue({
  render: h => h(App),
}).$mount('#app')
