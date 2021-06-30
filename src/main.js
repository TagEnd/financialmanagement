// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/style.css'

// 导入nprogress包对应的js和css
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// import ElementUI, { Message } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
import './plugins/element.js'

import axios from 'axios'
// 设置默认请求头
axios.defaults.headers["Content-type"] = 'application/json;'
// 配置请求的根路径
axios.defaults.baseURL = 'http://62.234.124.155:8081'

// axios request 请求拦截器
axios.interceptors.request.use(config=>{
    // 展示进度条
    Nprogress.start();
    config.headers.token = window.sessionStorage.getItem('token');
    // console.log(config);
    return config;
})

// axios response 请求拦截器
axios.interceptors.response.use(config=>{
    // 关闭进度条
    Nprogress.done();
    return config;
})

// 全局挂载axios
Vue.prototype.$http = axios

// Vue.prototype.$message = Message

Vue.config.productionTip = false




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
