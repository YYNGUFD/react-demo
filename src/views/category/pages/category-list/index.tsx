/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-03 14:19:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-03 18:32:03
 */
import React, { useState ,useEffect} from 'react';
import AddCategory from '../widget/add-category/index'
import CategoItem from './widget/category-item/index'
import CSS from './index.module.scss'
import { Button } from 'antd-mobile';
import { getCategoryList } from '@category/api/index'

function useCateList() {
  let [list, setList] = useState([]);
  let [isFetch,setFetch] = useState(false)
  async function fetchList(cb?:Function) {
    console.log("请求接口了-----")
    setFetch(true)
    let res:any = await getCategoryList();
    if (res.status == 0) {
      setList(res.data.list)
      cb && cb(true)
    } else {
      cb && cb(false)
    } 
    setFetch(false)
  }
  return {
    list, 
    isFetch,
    fetchList,
  }
}

function CategoryList(props?: any) {

  //控制显示添加按钮
  let [isShowAddCategory, setShowCate] = useState(false);
  let [repeatFet, setRepeatFet] = useState(false);
  let { list, fetchList, isFetch } = useCateList();
  
  useEffect(() => {
    fetchList();
    return () => {   
    };
  }, []);

 
  useEffect(() => {
    if (repeatFet) {
      console.log("重新请求接口去")
      fetchList((result) => {
         setRepeatFet(false)
      });
    }
  }, [repeatFet]);

  /**
   * 关闭选择框
   * @param type 
   */
  function closeDate(type?: boolean) {
    type && setRepeatFet(true)
    setShowCate(false) 
  }
  
  return (<div className={CSS.categoryList}>
    <div className={CSS.cateListWrapper}>
      {list.length == 0 && !isFetch && "暂时无数据"}
      {list.length > 0 && list.map((item, index) => {
        return <CategoItem key={index} item={item}></CategoItem>
      })}
    </div> 
    <div className={CSS.bottomBtn} ><Button type="primary" className={CSS.btn} onClick={()=>{setShowCate(true)}}>添加分类</Button></div>
    {/* 显示内容 */}
    {isShowAddCategory && <AddCategory onCancel={closeDate} onConfirm={() => { closeDate(true) }}></AddCategory>}

  </div>)
}
export default CategoryList;