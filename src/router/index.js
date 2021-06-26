import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/User/Login'
import UserInformation from '@/components/User/UserInformation'
import UserProjectQuota from '@/components/User/UserProjectQuota'
import UserDeviceManage from '@/components/User/UserDeviceManage'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/UserLogin'
        },
        {
            path: '/UserLogin',
            name: 'Login',
            component: Login
        },
        {
            path: '/UserInformation',
            name: 'UserInformation',
            component: UserInformation,
            children: [
                { path: '/UserProjectQuota', component: UserProjectQuota, },
                { path: '/UserDeviceManage', component: UserDeviceManage, },
            ]
        }
    ]
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 从哪个路径跳转而来
    // next 放行 强制跳转函数
    if (to.path == '/UserLogin') {
        return next();
    }
    const tokenStr = window.sessionStorage.getItem('token');
    if (!tokenStr) {
        return next('/UserLogin');
    }
    next();
})


export default router
