import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { time } from './utils/utils';
import * as echarts from 'echarts';

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.filter('time', time);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
