// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App';
import router from './router/index.js';
import store from './store/store.js'
import axios from './http/http.js'

Vue.prototype.axios = axios;


const app = new Vue({
    el: '#app',
    axios,
    router,
    store,
    render: h => h(App)
});