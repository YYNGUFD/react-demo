/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 09:51:36
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-03 18:34:46
 */
import axios from '@service/fetchConfig'

  // //添加分类
  // addCategory:'/category/addCategory',
  // getCategories:'/category/getCategories',
  // getCategoryDetail:'/category/getCategoryDetail',
  // deleteCategory:'/category/deleteCategory'
export async function addCategory(params?: {
  value: string,
  color: string,
  id?:number|string
}) {
  let resp = await axios.post('/category/addCategory',params);
  return resp;
}

export async function getCategoryList(params?:any) {
  let resp = await axios.post('/category/getCategories',params);
  return resp;
}

export async function getCategoryDetail(params: {
  id:string
}) {
  let resp = await axios.post('/category/getCategoryDetail',params);
  return resp;
}