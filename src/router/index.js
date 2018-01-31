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
                    path: '/:system/businessOpportunityList',
                    name: 'businessOpportunityList',
                    meta: {
                        requireAuth:true,
                        authUrl:'/home/business/showlist'
                    },
                    component: (resolve) => require(['../components/b2b/businessOpportunityList'], resolve),
                },
                {
                    path: '/:system/businessOpportunityList/keywords/:keywords/status/:status',
                    name: 'businessOpportunityListSearch1',
                    meta: {
                        requireAuth:true,
                        authUrl:'/home/business/showlist'
                    },
                    component: (resolve) => require(['../components/b2b/businessOpportunityList'], resolve),
                },
                {
                    path: '/:system/businessOpportunityList/keywords/:keywords',
                    name: 'businessOpportunityListSearch2',
                    meta: {
                        requireAuth:true,
                        authUrl:'/home/business/showlist'
                    },
                    component: (resolve) => require(['../components/b2b/businessOpportunityList'], resolve),
                },
                {
                    path: '/:system/businessOpportunityList/status/:status',
                    name: 'businessOpportunityListSearch3',
                    meta: {
                        requireAuth:true,
                        authUrl:'/home/business/showList'
                    },
                    component: (resolve) => require(['../components/b2b/businessOpportunityList'], resolve),
                },
                {
                    path: '/:system/businessOpportunityDetail/:id',
                    name: 'businessOpportunityDetail',
                    meta: {
                        requireAuth:true,
                        authUrl:'/home/business/detail'
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
    if (to.matched.some(r => r.meta.requireAuth)) {
        let system = to.params.system ? to.params.system : 'base';
        if (store.state.token) {
            let params = {
                'token':store.state.token,
                system:system,
                ip:'127.0.0.1',
            }
            axios.post(api.backendUrl+api.ssoUser, qs.stringify(params))
                .then(response => {
                    if(response.data.success){
                        let userInfo = response.data.data;
                        window.localStorage.user = JSON.stringify(userInfo);
                        if(to.meta.authUrl){
                            if(parseInt(userInfo.role.permission) === 1){
                                next();
                            }else {
                                if(userInfo.permission_urls.indexOf(to.meta.authUrl)!==-1){
                                    next();
                                }else {
                                    alert('你没有权限访问！！！');
                                    store.commit(types.LOADING, {isLoading: false})
                                    next({
                                        path: '/user/profile',
                                    })
                                }
                            }
                        }else {
                            next();
                        }
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
            store.commit(types.LOADING, {isLoading: false});
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