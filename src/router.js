import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/mi'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: Index,
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./pages/login.vue')
        },
        {
            path: '/register',
            name: 'Register',	//可以不用name字段   但有时需要用到name匹配
            component: () => import('./pages/register.vue')
        } ,
        {
            path: '/write',
            name: 'write',
            component: () => import('./components/index/Write.vue')
        },
        {
            path: '/receive',
            name: 'receive',
            component: () => import('./components/index/Receive.vue')
        },
        {
            path: '/manual',
            name: 'manual',
            component: () => import('./components/index/Manual.vue')
        },
        {
            path: '/send',
            name: 'send',
            component: () => import('./components/index/Send.vue')
        },
    ]
});