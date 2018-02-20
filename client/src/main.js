// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuelidate from 'vuelidate';
import VueAnalytics from 'vue-analytics';
import App from './App';
import router from './router';

import('../node_modules/vuetify/dist/vuetify.min.css');

Vue.use(Vuetify);
Vue.use(Vuelidate);
Vue.use(VueAnalytics, {
  id: process.env.GOOGLE_ANALYTICS_KEY,
  router,
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
});
