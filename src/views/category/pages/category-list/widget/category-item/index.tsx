/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-03 17:44:54
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 11:51:52
 */
import React from 'react';
import CSS from './index.module.scss'
import { Card} from 'antd-mobile';
import { TypeItems } from '@category/pages/@type'

interface TypePorps  {
  toDetail(_id: any);
  item: TypeItems, 
}

function CategoryItem(props: TypePorps) { 

  return (<Card className={CSS.itemWrapper} onClick={()=>{props.toDetail(props.item._id)}}>
    <div className={CSS.left}>
    <span className={CSS.color} style={{background:props.item.color}}></span>
    <p className={CSS.title}>{props.item.value}</p>
    <p className={CSS.createTime}>{ props.item.createTime}</p>
    </div>
    <p className={CSS.number}>{ props.item.count? '累计创建计划 : '+props.item.count : '该分类暂无计划' }</p>
  </Card>)
}
export default CategoryItem;