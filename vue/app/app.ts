import Vue from 'nativescript-vue'
import Home from './components/Home.vue'

console.log('__DISABLE_CSS__', __DISABLE_CSS__);
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = true

new Vue({
  render: (h) => h(Home),
}).$start()
