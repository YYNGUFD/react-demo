/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:59:53
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 11:48:20
 */
import React, { useState ,useEffect,useContext} from 'react';
import CSS from './index.module.scss'
import { Calendar } from 'antd-mobile';
import { TypeProps } from './index.d'; 
import { getDateTemp } from '@utils/tool' 
function TimeControl(props: TypeProps) {

  let {currDate,setDate} = useContext(props.context)
  let [showCalendar, setCalendar] = useState(false);

  function onConfirm(val) { 
    let time = val.getFullYear() + "-"
      + (val.getMonth() + 1) + "-" + val.getDate(); 
    onCancel();
    setDate(time); 
  }
  function onCancel() {
    setCalendar(false)
  }  
  let CalendarDate = getDateTemp(currDate)
  console.log(CalendarDate)
  return <><div className={CSS.timeWrapper}>
    <div>{currDate}</div>
    <div onClick={() => { setCalendar(true) }}>选择时间</div>
  </div>
    <Calendar
      type='one'
      visible={showCalendar}
      onCancel={onCancel}
      defaultDate={ CalendarDate}
      onConfirm={onConfirm}
    />
  </>
}
export default TimeControl;