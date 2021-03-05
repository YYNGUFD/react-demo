/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-04 11:24:01
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-05 15:36:04
 */
import React, {memo, useState,useEffect ,useRef,forwardRef,useImperativeHandle} from 'react';
import { Calendar, List,Icon } from 'antd-mobile'
import { changeDate,getDateTemp,getNowDate } from '@utils/tool'
import CSS from './index.module.scss'


interface TypePorps{
  title?: string,
  time?: any,
  onConfirm?:Function, 
}
function CalenderSelect(props?: TypePorps,ref?) {
  console.log("子组件日历-----")  
  let [showCal, setShowCal] = useState(false)
  let [date, setDate] = useState()  
  
  //初始进入时候赋值 后续不进行赋值
  useEffect(()=>{  
    setDate(props.time)
  },[props.time])

  //给父组件暴露值
  useImperativeHandle(ref,()=>({
    getTime:()=>{
      return getNowDate(date)
    }
  }))
  
  function onConfirm(time) {
    setShowCal(false)  
    setDate(changeDate(time)) 
  }  
  return (
    <>
        <Calendar
        type='one' 
        visible={showCal}
        onConfirm={onConfirm}
        defaultTimeValue={getDateTemp(date|| '')}
        onCancel={()=>{setShowCal(false)}}
      />
      <div className={CSS.caleWrapper} onClick={() => { setShowCal(true) }}>
        <p className={CSS.title}>{ props.title}</p>
        <div className={CSS.rightContent}>
          <p className={CSS.desc}>{date ? getNowDate(date) : ''}</p>
          <Icon type="right" color="#999"></Icon>
        </div>
      </div>
    </>
 )
}
export default forwardRef(CalenderSelect)