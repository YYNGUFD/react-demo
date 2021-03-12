/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:06:18
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-09 16:34:26
 */
import React, { useState, useRef, useEffect ,useCallback,useMemo} from 'react';
import { InputItem, TextareaItem, Button, Toast } from 'antd-mobile'
import CSS from './index.module.scss'
import CalenderSelect from './widget/calender-select/index'
import { useCateList } from '@category/@use-method'
import { getUrlParams } from '@utils/common'
import { addNote } from '@note/api/index'
import { useNoteDetail } from '@note/@use-methods/index'


interface TypePorps {
  history?: any,
}
function AddNote(props: TypePorps) {
  let [titleName,setTitleName] = useState("");
  let { cateList, isFetch, fetchCateList, } = useCateList()
  let [beginTime, setBeginTime] = useState(null);
  let [endTime, setEndTime] = useState(null);
  let [categoryId, setSelectId] = useState();
  let [textValue, setTextValue] = useState("");
  let id = getUrlParams('id');
  let beginRef = useRef(null)
  let endRef = useRef(null)
  //编辑时需要操作
  let {item,fetchItem} = useNoteDetail() 

  //综合在一起
  let [form,setForm] = useState({})
 
  useEffect(() => {
    fetchCateList();
    if(id){
      fetchItem({id:id});
    }
    return () => {
    };
  }, []); 

  //编辑时候
  useEffect(() => {
    //item 修改的时候触发器这里
    if(item){
       setTitleName(item.title)
       setBeginTime(item.beginTime); 
       setEndTime(item.endTime)
       setSelectId(item.categoryId._id)
       setTextValue(item.desc) 
    } 
  }, [item]);  

  function toAddCate() {
    props.history.push('/category/cate-list')
  }
  function checkValue() {  
    if (!titleName || !beginRef.current.getTime() || !beginRef.current.getTime() || !categoryId) {
      Toast.fail("请将计划内容填写完整")
      return false
    } 
    //比较时间差距
    var current = new Date(beginRef.current.getTime().replace(/\-/g, "/"));
    var date = new Date(beginRef.current.getTime().replace(/\-/g, "/"));
    if (date < current) {
      Toast.fail("开始时间应小于结束时间")
      return false
    }
    return true;
  }
  async function submit() {
    if (checkValue()) {
      let params = {
        title: titleName,
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

  //@todo 测试useMemo
 console.log("父组件重新render")
  return <div className={CSS.addNote}>
    {/* 计划名称 */}
    <InputItem type="text"  value={titleName}  onChange={(value) => {setTitleName(value)}} placeholder="请输入计划名称" labelNumber={4}>计划名称</InputItem>
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
    <CalenderSelect title="计划开始时间" ref={beginRef} time={beginTime}></CalenderSelect>
    {/* 结束时间 */}
    <CalenderSelect title="计划结束时间" ref ={endRef} time={endTime}></CalenderSelect>

    {/* 备注 */}
    <TextareaItem
      value={textValue}
      title="备注"
      rows={2}
      onChange={(val) => { setTextValue(val) }}
      placeholder="请输入备注信息"
    />
    <Button type="primary" className={CSS.btn} onClick={submit}>{id?"确认修改":"添加"}</Button>
  </div>
}
export default AddNote;