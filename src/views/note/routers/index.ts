/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:11:13
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-12 14:49:41
 */
const nodeListRoutes = [
  {
    path: '/note/note-index',
    component: () => import( /* webpackChunkName: "note" */ '../pages/note-index/index') ,
    meta:{
        title:'笔记首页'
    },
  },
  {
    path: '/note/add-note',
    component: () => import( /* webpackChunkName: "note" */ '../pages/add-note') ,
    meta:{
        title:'添加笔记'
    },
  },
  {
    path: '/note/note-detail',
    component: () => import( /* webpackChunkName: "note" */ '../pages/note-detail/index') ,
    meta:{
        title:'笔记详情'
    },
  },
  {
    path: '/note/note-list',
    component: () => import( /* webpackChunkName: "note" */ '../pages/note-list/index') ,
    meta:{
        title:'笔记列表'
    },
  },
]
export default nodeListRoutes;