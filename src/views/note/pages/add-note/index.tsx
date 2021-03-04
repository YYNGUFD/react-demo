/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:06:18
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 17:11:21
 */
import React, { useState, useRef, useEffect ,useCallback,useMemo} from 'react';
import { InputItem, TextareaItem, Button, Toast } from 'antd-mobile'
import CSS from './index.module.scss'
import CalenderSelect from './widget/calender-select/index'
import { useCateList } from '@category/pages/@use-method'
import { getUrlParams } from '@utils/common'
import { addNote } from '@note/api/index'


interface TypePorps {
  history?: any,
}
function AddNote(props: TypePorps) {
  let titleName = useRef("");
  let { cateList, isFetch, fetchCateList, } = useCateList()
  let [beginTime, setBeginTime] = useState(null);
  let [endTime, setEndTime] = useState(null);
  let [categoryId, setSelectId] = useState();
  let [textValue, setTextValue] = useState("");
  let id = getUrlParams('id')

  useEffect(() => {
    fetchCateList()
    return () => {
    };
  }, []);

  function toAddCate() {
    props.history.push('/category/cate-list')
  }
  function checkValue() { 
    console.log(categoryId)
    console.log(titleName.current)
    console.log(beginTime)
    console.log(endTime)
    if (!titleName.current || !beginTime || !endTime || !categoryId) {
      Toast.fail("请将计划内容填写完整")
      return false
    }
    //比较时间差距
    var current = new Date(beginTime.replace(/\-/g, "/"));
    var date = new Date(endTime.replace(/\-/g, "/"));
    if (date < current) {
      Toast.fail("开始时间应小于结束时间")
      return false
    }
    return true;
  }
  async function submit() {
    if (checkValue()) {
      let params = {
        title: titleName.current,
        desc: textValue,
        categoryId: categoryId,
        beginTime: beginTime,
        endTime: endTime,
        id: id
      }
      let res:any = await addNote(params);
      if(res.status == 0){
         Toast.success(res.msg)
         props.history.push("/note/note-list")
      }
    }
  }
 
 

  return <div className={CSS.addNote}>
    {/* 计划名称 */}
    <InputItem type="text" onChange={(value) => { titleName.current = value }} placeholder="请输入计划名称" labelNumber={4}>计划名称</InputItem>
    {/* 类别 */}
    <div className={CSS.categoryList}>
      <p className="title">选择类别</p>
      <div className={CSS.cateLists}>
        {cateList.length > 0 && cateList.map((item, index) => {
          return <div className={CSS.item} key={index} style={{ background: item.color }} onClick={()=>{setSelectId(item._id)}}>{item.value}
            {categoryId == item._id && <i className={"iconfont icon-yixuanze " + CSS.selectType}
            ></i>}
          </div>
        })}
        <div className={CSS.item + ' ' + CSS.addType} onClick={toAddCate}>
          添加<span className="iconfont icon-bianjibijishishouxie"  >  </span>
        </div>
      </div>
    </div>
    {/* 开始时间 */}
    <CalenderSelect title="计划开始时间" time={beginTime} onConfirm={ (val)=>{setBeginTime(val)}}></CalenderSelect>
    {/* 结束时间 */}
    <CalenderSelect title="计划结束时间" time={endTime} onConfirm={(val)=>{setEndTime(val)}}></CalenderSelect>

    {/* 备注 */}
    <TextareaItem
      value={textValue}
      title="备注"
      rows={2}
      onChange={(val) => { setTextValue(val) }}
      placeholder="请输入备注信息"
    />
    <Button type="primary" className={CSS.btn} onClick={submit}>提交</Button>
  </div>
}
export default AddNote;