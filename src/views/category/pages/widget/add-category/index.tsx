/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-03 14:50:24
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-03 18:23:13
 */
import React, { useState } from 'react';
import { Modal, Toast, Icon, InputItem ,Button} from 'antd-mobile';
import CSS from './index.module.scss'
import { TypeProps } from './index.d'
import { addCategory } from '@category/api/index'
import {isCCD} from '@utils/common'
const colorList = [
  ["#B8860B", "#DAA520", "#FFD700", "#FFFF00", "#BDB76B", "#F0E68C", "#EEE8AA"],
  ["#FFA07A", "#FF4500", "#FF6347", "#FF7F50", "#FF8C00", "#F4A460", "#CD853F"],
  ["#D2B48C", "#DEB887", "#F5DEB3", "#FFE4B5", "#FFDEAD", "#FFDAB9", "#FFE4C4"],
  ["#8B4513", "#A0522D", "#D2691E", "#CD5C5C", "#BC8F8F", "#F08080", "#FA8072",],
  ["#C71585", "#D87093", "#FF1493", "#FF00FF", "#FF69B4", "#FFC0CB", "#FFB6C1",],
  ["#FFA07A", "#FF4500", "#FF6347", "#FF7F50", "#FF8C00", "#F4A460", "#CD853F"],
  ["#2E8B57", "#008080", "#66CDAA", "#9ACD32", "#32CD32", "#00FF00", "#7FFF00",],
  ["#4B0082", "#800080", "#8B008B", "#9932CC", "#8A2BE2", "#9400D3", "#6A5ACD"],
  ["#9370DB", "#7B68EE", "#BA55D3", "#EE82EE", "#DDA0DD", "#D8BFD8", "#E6E6FA"],
  ["#191970", "#000080", "#00008B", "#483D8B", "#0000CD", "#4169E1", "#1E90FF",],
  ["#6495ED", "#00BFFF", "#87CEFA", "#B0C4DE", "#ADD8E6", "#4682B4", "#008B8B",],
]
function AddCategory(props: TypeProps) {
  let item = props.item || {value:'',color:null}

  let [categoryName, setName] = useState(item.value || "")
  let [color, setColor] = useState(item.color || colorList[0][0])
  let [isLoading,setLoading] = useState(false)

  let colorHtmlList = []
  colorList.forEach((item, index) => {
    let result = <div key={index}>
      {item.map((it, idx) => <span style={{ background: it }} key={idx + 'a'} onClick={()=>{setColor(it)}}></span>)}
    </div>
    colorHtmlList.push(result)
  })

  //提交内容 
  async function onConfirm() {
    if (isLoading) return;
    //娇艳
    if (isCCD(categoryName)) {
      setLoading(true)
      let res:any = await addCategory({
        value: categoryName,
        color: color,
        id: item._id || '',
      })
      if (res.status == 0) {
        Toast.success(res.msg)
        setLoading(false)
        props.onConfirm && props.onConfirm() 
      }
    } else {
      Toast.fail("请输入正确的类别名称")
    } 
  }

  return (<div className={CSS.addModal}>
    <div className={CSS.containerCon}>
      <Icon type="cross-circle" className={CSS.close} size="sm" color="#666" onClick={ ()=>{props.onCancel && props.onCancel()}}/>
      <div className={CSS.formMsg}>
        <InputItem type="text"  className={CSS.input} value={categoryName} placeholder="请输入分类名称" onChange={(val)=>{setName(val)}} labelNumber={2} > 类名</InputItem>
        <div className={CSS.colorSelect}>已选颜色 <span style={{ background: color }}></span></div>
      </div>
      <div className={CSS.colorWrapper} >
        {colorHtmlList}
      </div>
      <div className={CSS.btnWrapper}>
        <Button className={CSS.btn} loading={isLoading} type="primary" onClick={onConfirm}>确认</Button>
      </div>
    </div>
  </div>)
}
export default AddCategory;