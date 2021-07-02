import Vue from 'vue'
import Router from 'vue-router'
// import UserLogin from '@/components/User/Login'
// import UserInformation from '@/components/User/UserInformation'
// import UserProjectQuota from '@/components/User/UserProjectQuota'
// import UserDeviceManage from '@/components/User/UserDeviceManage'

// import AdminLogin from '@/components/Admin/AdminLogin'
// import AdminInformation from '@/components/Admin/AdminInformation'
// import AdminProjectQuota from '@/components/Admin/AdminProjectQuota'
// import AdminDeviceManage from '@/components/Admin/AdminDeviceManage'



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
            name: 'UserLogin',
            component: UserLogin => require(['@/components/User/Login'], UserLogin),
            meta: {
                PageType: 'User',
            }
        },
        {
            path: '/UserInformation',
            name: 'UserInformation',
            component: UserInformation => require(['@/components/User/UserInformation'], UserInformation),
            children: [
                { path: '/UserProjectQuota', component: UserProjectQuota => require(['@/components/User/UserProjectQuota'], UserProjectQuota), meta: { PageType: 'User', } },
                { path: '/UserDeviceManage', component: UserDeviceManage => require(['@/components/User/UserDeviceManage'], UserDeviceManage), meta: { PageType: 'User', } },
            ],
            meta: {
                PageType: 'User',
            }
        },
        // {
        //     path: '/AdminLogin',
        //     name: 'AdminLogin',
        //     component: AdminLogin => require(['@/components/Admin/AdminLogin'], AdminLogin),
        //     meta: {
        //         PageType: 'Admin',
        //     }
        // },
        {
            path: '/AdminInformation',
            name: 'AdminInformation',
            component: AdminInformation => require(['@/components/Admin/AdminInformation'], AdminInformation),
            meta: {
                PageType: 'Admin',
            },
            children: [
                { path: '/AdminProjectQuota', component: AdminProjectQuota => require(['@/components/Admin/AdminProjectQuota'], AdminProjectQuota), meta: {PageType: 'Admin',} },
                { path: '/AdminDeviceManage', component: AdminDeviceManage => require(['@/components/Admin/AdminDeviceManage'], AdminDeviceManage), meta: {PageType: 'Admin',} },
                // { path: '/AdminProjectQuota', component: AdminProjectQuota, meta: { PageType: 'Admin', } },
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
    if (to.path == '/AdminLogin') {
        return next();
    }
    const tokenStr = window.sessionStorage.getItem('token');
    const TokenType = window.sessionStorage.getItem('TokenType')
    // console.log("-****************");
    // console.log(to.meta.PageType);
    // console.log(tokenStr);
    // console.log(TokenType);
    // console.log("*****************");
    console.log(to.meta.PageType);

    if (to.meta.PageType == 'User') {
        if (!tokenStr) {
            return next('/UserLogin')
        }
        else {
            if (TokenType != 'User') {
                return next('/UserLogin')
            }
            else {
                return next()
            }
        }
    }
    else if (to.meta.PageType == 'Admin') {
        if (!tokenStr) {
            // return next('/AdminLogin')
            return next('/UserLogin')
        }
        else {
            if (TokenType != 'Admin') {
                // return next('/AdminLogin')
                return next('/UserLogin')
            }
            else {
                return next()
            }
        }
    }
    else
    {
        return next('/UserLogin')
    }


})


export default router
