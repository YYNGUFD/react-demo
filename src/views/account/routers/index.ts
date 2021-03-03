/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 08:58:34
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-02 15:24:10
 */
const accountRouteList = [ 
  {
    path: '/account/login',
    component: () => import( /* webpackChunkName: "account" */ '../pages/login/index') ,
    meta:{
        title:'登录'
    },
  },
  {
    path: '/account/register',
    component: () => import( /* webpackChunkName: "account" */ '../pages/register/index') ,
    meta:{
        title:'注册'
    },
  }
]
export default accountRouteList;