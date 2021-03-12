import React, { useState } from 'react';

import CSS from './index.module.scss'
interface TypeProps{
  selectMsg?:any,
  timeList:any[],
  categoryList:any[],
  confirmSelect:Function,
}
function TimePanel(props:TypeProps){
  let {timeList,categoryList} = props;
  let [selectTime,setTime] = useState(props.selectMsg.time||'')
  let [categoryId,setCategoryId] = useState(props.selectMsg.categoryId||'');


  return (<div className={CSS.pancelModal}>
    <div className={CSS.modalSelect}>
      <p className={CSS.title}>时间</p>
      <div className={CSS.itemWrapper} >
      {
       timeList.map((item,index)=>(<div key={index} className={selectTime == item ? CSS.select:''}  onClick={()=>{setTime(item)}}>{item}</div>))
     }
      </div>
      <p className={CSS.title}>分类 </p>
      <div className={CSS.itemWrapper}>
     {
       categoryList.map((item,index)=>(<div key={index} className={categoryId == item._id ? CSS.select:''} onClick={()=>{setCategoryId(item._id)}}>{item.value}</div>))
     }
      </div>
      <div className={CSS.btnWrapper}>
      <span className={CSS.clear} onClick={()=>{setTime('');setCategoryId("")}}>清空</span>
        <span className={CSS.confirm} onClick={()=>{props.confirmSelect({time:selectTime,categoryId:categoryId})}}>确认</span>
      </div>
    </div>
  </div>)
}
export default TimePanel;