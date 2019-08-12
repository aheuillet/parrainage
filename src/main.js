import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import VueAnime from 'vue-animejs';


Vue.config.productionTip = false
Vue.use(VueAnime);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
