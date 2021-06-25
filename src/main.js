// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/style.css'

import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import axios from 'axios'
// 设置默认请求头
axios.defaults.headers["Content-type"] = "application/json"
// 配置请求的根路径
axios.defaults.baseURL = '/api'

axios.defaults.withCredentials = true; // 允许携带cookie

axios.interceptors.request.use(config=>{
    config.headers.token = window.sessionStorage.getItem('token');
    // console.log(config);
    return config;
})

// 全局挂载axios
Vue.prototype.$http = axios

Vue.prototype.$message = Message

Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
