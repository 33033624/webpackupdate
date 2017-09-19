import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './app.vue'
import './index.scss'
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
