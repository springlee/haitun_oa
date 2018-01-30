import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '../App'
import store from '../store/store'
import * as types from '../store/types'
import axios from '../http/http.js'
import api from '../constant/api.js'
import qs from 'qs'

Vue.use(VueRouter);

const routes = [
        {
            path: '/',
            name: 'app',
            component: App,
            children: [
                {
                    path: '/user/profile',
                    name: 'profile',
                    meta: {
                        requireAuth:true
                    },
                    component: (resolve) => require(['../components/user/Profile.vue'], resolve),
                },
                {
                    path: '/user/login',
                    name: 'login',
                    component: (resolve) => require(['../components/user/Login.vue'], resolve),
                },
                {
                    path: '/b2b/businessOpportunityList',
                    name: 'businessOpportunityList',
                    meta: {
                        requireAuth:true
                    },
                    component: (resolve) => require(['../components/b2b/businessOpportunityList'], resolve),
                },
                {
                    path: '/b2b/businessOpportunityDetail/:id',
                    name: 'businessOpportunityDetail',
                    meta: {
                        requireAuth:true
                    },
                    component: (resolve) => require(['../components/b2b/businessOpportunityDetail'], resolve),
                },
                {
                    path: '*',
                    redirect: '/user/profile'
                }
            ]
        }
    ]
;


// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    store.commit(types.LOADING, {isLoading: true})
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            let params = {
                'token':store.state.token,
                system:'base',
                ip:'127.0.0.1',
            }
            axios.post(api.backendUrl+api.ssoUser, qs.stringify(params))
                .then(response => {
                    if(response.data.success){
                        window.localStorage.user =JSON.stringify(response.data.data);
                        next();
                    }else {
                        store.commit(types.LOADING, {isLoading: false})
                        next({
                            path: '/user/login',
                            query: {redirect: to.fullPath}
                        })
                    }

                })

        }
        else {
            store.commit(types.LOADING, {isLoading: false})
            next({
                path: '/user/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

router.afterEach(function (to) {
    store.commit(types.LOADING, {isLoading: false})
})

export default router;