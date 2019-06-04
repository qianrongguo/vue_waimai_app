// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import './mock/mockServer'
import VueLazyload from 'vue-lazyload'
import '../src/filters/index'
import loading from './common/imgs/loading.gif'


Vue.use(VueLazyload, {
  loading
});

Vue.config.productionTip = false;
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
});
