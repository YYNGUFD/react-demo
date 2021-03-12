/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-03 14:19:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-05 19:03:25
 */
import React, { useState ,useEffect} from 'react';
import AddCategory from '../widget/add-category/index'
import CategoItem from './widget/category-item/index'
import CSS from './index.module.scss'
import { Button } from 'antd-mobile';
import {useCateList } from '@views/category/@use-method'

function CategoryList(props?: any) {

  //控制显示添加按钮
  let [isShowAddCategory, setShowCate] = useState(false);
  let [repeatFet, setRepeatFet] = useState(false);
  let { cateList, isFetch, fetchCateList } = useCateList();
  
  useEffect(() => {
    fetchCateList();
    return () => {   
    };
  }, []);

 
  useEffect(() => {
    if (repeatFet) { 
      fetchCateList((result) => {
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

  /**
   * 
   */
  function toDetail(id?:string) {
   props.history.push("/category/cate-detail?id="+id)
  }
  
  return (<div className={CSS.categoryList}>
    <div className={CSS.cateListWrapper}>
      {cateList.length == 0 && !isFetch && "暂时无数据"}
      {cateList.length > 0 && cateList.map((item, index) => {
        return <CategoItem key={index} item={item} toDetail={toDetail}></CategoItem>
      })}
    </div> 
    <div className={CSS.bottomBtn} ><Button type="primary" className={CSS.btn} onClick={()=>{setShowCate(true)}}>添加分类</Button></div>
    {/* 显示内容 */}
    {isShowAddCategory && <AddCategory onCancel={closeDate} onConfirm={() => { closeDate(true) }}></AddCategory>}

  </div>)
}
export default CategoryList;