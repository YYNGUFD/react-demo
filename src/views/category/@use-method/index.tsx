/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-04 14:35:56
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-05 11:36:34
 */
import React, { useState } from 'react';
import { getCategoryList } from '@category/api/index'

export function useCateList() {
  let [cateList, setList] = useState([]);
  let [isFetch,setFetch] = useState(false)
  async function fetchCateList(cb?:Function) {
    console.log("请求接口了-----")
    setFetch(true)
    let res:any = await getCategoryList();
    if (res.status === 0) {
      setList(res.data.list)
      cb && cb(true)
    } else {
      cb && cb(false)
    } 
    setFetch(false)
  }
  return {
    cateList,
    isFetch,
    fetchCateList,
  }
}
export default {}