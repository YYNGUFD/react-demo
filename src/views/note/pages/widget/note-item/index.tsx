/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:54:31
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-05 11:03:27
 */

import React  from 'react';
import CSS from './index.module.scss'
import { statusMap } from '../../mixins/index'
import { TypePorps } from '@note/pages/@type/index.d'
import { Card } from 'antd-mobile'
import Tag from '@components/tag/index'
import {withRouter} from 'react-router-dom'

//@todo -- 使用withRouter的时候是否能够做到类型兼容

function NoteItem(props:any) { 
  let item = props.item 

  function toDetail(id?){
    id  && props.history.push('/note/note-detail?id=' + item._id)
  } 
  return (<Card className={CSS.noteItem} full={true} onClick={toDetail}>

    <Card.Body >
      <div className={CSS.header}>
        <div className={CSS.left}>
          <Tag value={item.categoryId.value} color={item.categoryId.color}></Tag>
        &nbsp;&nbsp;{item.title}
        </div>
        <div className={CSS.icon}>
          <span
            className={'iconfont ' + statusMap[item.status]['icon']}
            style={{ color: statusMap[item.status]['color'] }}
          ></span>
        </div>
      </div>
      <div className={CSS.body}>
        <div className={CSS.desc}>{item.desc}</div>
        <div className={CSS.time}>
          <p>开始时间：{item.beginTime}</p>
          <p>结束时间：{item.endTime}</p>
        </div>
      </div>
    </Card.Body>
    <Card.Footer content="创建时间" className={CSS.footer} extra={<div>{item.createTime}</div>} />
  </Card>)
}
//利用此方法去除调用
//@ts-ignore 
export default withRouter(NoteItem);
// export default NoteItem;