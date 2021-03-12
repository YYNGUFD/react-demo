/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:06:18
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-08 08:54:07
 */
import React, { useState, useRef, useEffect, useReducer, useCallback } from 'react';
import { InputItem, TextareaItem, Button, Toast } from 'antd-mobile'
import CSS from './index.module.scss'
import CalenderSelect from './widget/calender-select/index'
import { useCateList } from '@views/category/@use-method'
import { getUrlParams } from '@utils/common'
import { addNote } from '@note/api/index'
import { useNoteDetail } from '@note/@use-methods/index'


interface TypePorps {
  history?: any,
}

// 使用react reducer 进行操作
const initState = {
  title: '',//计划标题
  beginTime: '',//开始时间
  endTime: '', //结束时间
  categoryId: '', //选择分类id
  desc: '', //文本value的值
}
function enhanceReducer(state, action) {
  //进行更新
  console.log(action)
  let targetValue = action.target;
  return { ...state, ...targetValue }
}
function AddNote(props: TypePorps) {
  const [state, dispatch] = useReducer(enhanceReducer, initState);
  let id = getUrlParams('id');
  let { cateList, fetchCateList } = useCateList();

  //日历组件获取
  let beginRef = useRef(null)
  let endRef = useRef(null)

  const updateForm = useCallback((target) => {
    dispatch({ target: target })
  }, [])

  //编辑时需要操作
  let { item, fetchItem } = useNoteDetail()

  useEffect(() => {
    fetchCateList();
    if (id) {
      fetchItem({ id: id });
    }
    return () => {
    };
  }, []);

  //编辑时候
  useEffect(() => {
    //item 修改的时候触发器这里
    if (item) {
      updateForm({
        title: item.title,
        beginTime: item.beginTime,//开始时间
        endTime: item.endTime, //结束时间
        categoryId: item.categoryId._id, //选择分类id
        desc: item.desc, //文本value的值
      })
    }
  }, [item]);

  function toAddCate() {
    props.history.push('/category/cate-list')
  }
  function checkValue() {
    for (var key in state) {
      if (key != 'desc' && !state[key]) {
        Toast.fail("请将表单内容填写完整");
        return false;
      }
    }
    //比较时间差距
    var current = new Date(state.beginTime.replace(/\-/g, "/"));
    var date = new Date(state.endTime.replace(/\-/g, "/"));
    if (date < current) {
      Toast.fail("开始时间应小于结束时间")
      return false
    }
    return true;
  }
  async function submit() {
    //数据获取
    updateForm({
      beginTime: beginRef.current.getTime(),
      endTime: endRef.current.getTime(),
    });
    if (checkValue()) {
      let params = state;
      let res: any = await addNote(params);
      if (res.status == 0) {
        Toast.success(res.msg)
        props.history.push("/note/note-list")
      }
    }
  }

  //@todo 测试useMemo 
  return <div className={CSS.addNote}>
    {/* 计划名称 */}
    <InputItem type="text" value={state.title} onChange={(value) => { updateForm({ title: value }) }} placeholder="请输入计划名称" labelNumber={4}>计划名称</InputItem>
    {/* 类别 */}
    <div className={CSS.categoryList}>
      <p className="title">选择类别</p>
      <div className={CSS.cateLists}>
        {cateList.length > 0 && cateList.map((item, index) => {
          return <div className={CSS.item} key={index} style={{ background: item.color }} onClick={() => { updateForm({ categoryId: item._id }) }}>{item.value}
            {state.categoryId == item._id && <i className={"iconfont icon-yixuanze " + CSS.selectType}
            ></i>}
          </div>
        })}
        <div className={CSS.item + ' ' + CSS.addType} onClick={toAddCate}>
          添加<span className="iconfont icon-bianjibijishishouxie"  >  </span>
        </div>
      </div>
    </div>


    {/* 开始时间 */}
    <CalenderSelect title="计划开始时间" ref={beginRef} time={state.beginTime}></CalenderSelect>
    {/* 结束时间 */}
    <CalenderSelect title="计划结束时间" ref={endRef} time={state.endTime}></CalenderSelect>

    {/* 备注 */}
    <TextareaItem
      value={state.desc}
      title="备注"
      rows={2}
      onChange={(val) => { updateForm({ textValue: val }) }}
      placeholder="请输入备注信息"
    />
    <Button type="primary" className={CSS.btn} onClick={submit}>{id ? "确认修改" : "添加"}</Button>
  </div>
}
export default AddNote;