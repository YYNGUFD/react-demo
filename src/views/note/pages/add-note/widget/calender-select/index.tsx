/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-04 11:24:01
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 17:07:03
 */
import React, { useState } from 'react';
import { Calendar, List,Icon } from 'antd-mobile'
import { changeDate } from '@utils/tool'
import CSS from './index.module.scss'


interface TypePorps{
  title?: string,
  time?: any,
  onConfirm?:Function,
}
function CalenderSelect(props?: TypePorps) {
  let [showCal, setShowCal] = useState(false)
  let [date, setDate] = useState(props.time)
  
  function onConfirm(time) {
    setDate(time)
    setShowCal(false)
    props.onConfirm && props.onConfirm(changeDate(time))
  }  
  return (
    <>
      <Calendar
        type='one' 
        visible={showCal}
        onConfirm={onConfirm}
        defaultValue={props.time|| (new Date())}
        onCancel={()=>{setShowCal(false)}}
      />
      <div className={CSS.caleWrapper} onClick={() => { setShowCal(true) }}>
        <p className={CSS.title}>{ props.title}</p>
        <div className={CSS.rightContent}>
          <p className={CSS.desc}>{date ? changeDate(date) : ''}</p>
          <Icon type="right" color="#999"></Icon>
        </div>
      </div>
    </>
 )
}
export default CalenderSelect