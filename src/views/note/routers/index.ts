/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:11:13
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 11:08:34
 */
const nodeListRoutes = [
  {
    path: '/note/note-list',
    component: () => import( /* webpackChunkName: "account" */ '../pages/note-list/index') ,
    meta:{
        title:'笔记首页'
    },
  },
  {
    path: '/note/add-note',
    component: () => import( /* webpackChunkName: "account" */ '../pages/add-note') ,
    meta:{
        title:'添加笔记'
    },
  },
]
export default nodeListRoutes;