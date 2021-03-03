/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:11:13
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-02 18:12:16
 */
const nodeListRoutes = [
  {
    path: '/note/note-list',
    component: () => import( /* webpackChunkName: "account" */ '../pages/note-list/index') ,
    meta:{
        title:'笔记首页'
    },
  },
]
export default nodeListRoutes;