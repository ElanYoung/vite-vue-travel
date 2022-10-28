import Vue from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';

import '@/style/index.less';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
