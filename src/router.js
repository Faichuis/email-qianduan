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
        },
    ]
});