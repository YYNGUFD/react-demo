/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-03 14:19:59
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-03 14:26:42
 */
const categoiesList = [
  {
    path: '/category/cate-list',
    component: () => import( /* webpackChunkName: "category" */ '../pages/category-list/index') ,
    meta:{
        title:'分类列表'
    },
  },
  {
    path: '/category/cate-detail',
    component: () => import( /* webpackChunkName: "category" */ '../pages/category-detail/index') ,
    meta:{
        title:'分类详情'
    },
  },
]
export default categoiesList;