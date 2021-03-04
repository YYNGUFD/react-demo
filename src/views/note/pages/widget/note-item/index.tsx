/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:54:31
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 19:55:36
 */

import React, { PureComponent } from 'react';
import CSS from './index.module.scss'
import { statusMap } from '../../mixins/index'
import { TypePorps } from './index.d'
import { Card } from 'antd-mobile'
import Tag from '@components/tag/index'

function NoteItem(props: TypePorps) {
  console.log(props)
  let item = props.item
  return (<Card className={CSS.noteItem}>
    <Card.Header title={item.title} extra={<div >
      <Tag value={item.categoryId.value} color={item.categoryId.color}></Tag>
      <div className={CSS.icon}>
      <span
        className={'iconfont ' + statusMap[item.status]['icon']}
        style={{ color: statusMap[item.status]['color'] }}
      ></span>
      </div>
  
    </div>} />
    <Card.Body className={CSS.body}>
      <div className={CSS.desc}>{item.desc}</div>
      <div className={CSS.time}>
        <p>开始时间：{item.beginTime}</p>
        <p>结束时间：{item.endTime}</p>
      </div>
    </Card.Body>
    <Card.Footer content="创建时间" className={CSS.footer} extra={<div>{item.createTime}</div>} />
  </Card>)
}
export default NoteItem;