import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/User/Login'
import UserInformation from '@/components/User/UserInformation'
import UserProjectQuota from '@/components/User/UserProjectQuota'
import UserDeviceManage from '@/components/User/UserDeviceManage'


Vue.use(Router)

export default new Router({
  routes: [
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
