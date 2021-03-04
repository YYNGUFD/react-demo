/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-03 14:22:51
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 11:05:00
 */
import React, { useState, useEffect } from 'react';
import { getCategoryDetail, deleteCategoryDetail } from '@category/api/index'
import { List, Button, Toast, Modal } from 'antd-mobile'
import CSS from './index.module.scss'
import AddCategory from '../widget/add-category/index'
import { getUrlParams } from '@utils/common'
import {useCallbackState} from '@utils/use-method'
const alert = Modal.alert;
interface TypeProps {
  history?: any,
}

function useCateDetail() {
  let [sourceItem, setSourceItem] = useState(null);
  let [isDeleteLoading, setDelete] = useState(false)

  //删除数据
  async function deleteCategory(params, cb?: Function) {
    if (isDeleteLoading) return;
    setDelete(true)
    let res: any = await deleteCategoryDetail(params)
    if (res.status == 0) {
      cb && cb(true)
      Toast.success(res.msg)
    } else {
      Toast.fail(res.msg)
    }
    setDelete(false)
  }
  
  //获取数据
  async function fetDate(params, cb?: Function) {
    let res = await getCategoryDetail(params)
    if (res.status == 0) {
      setSourceItem(res.data)
      //此方式修改是异步的 因此不能直接进行操作sourceItem的值 需要进行修改
      cb && cb(true) 
    }
  } 
  return {
    sourceItem,
    fetDate,
    deleteCategory,
  }
}


function CategoryDetail(props: TypeProps) {
  let id = getUrlParams("id");

  //存储单个内容记录
  let [item, setItem] = useState([]);
  let [isShowEditModal, setShowModal] = useState(false)
  let { sourceItem, fetDate, deleteCategory } = useCateDetail()
  
  //赋值item
  useEffect(() => {
    console.log(sourceItem)
    if (sourceItem) {
      let item = [
        { title: "分类名称", value: sourceItem.value },
        { title: "代表颜色", value: sourceItem.color, isBg: true },
        { title: "创建时间", value: sourceItem.createTime, },
        { title: "计划数量", value: sourceItem.count, }
      ]
      setItem(item)
    }  
  }, [sourceItem]);

  useEffect(() => {
    fetDate({ id: id }, (result?: boolean) => {
      if (!result) {
        Toast.fail("数据获取失败，请返回重试");
        props.history.go(-1)
      }
    }) 
  }, []);

  function deleteC() {
    if (sourceItem.count > 0) {
      alert('提示', '删除后该分类下所有计划将被删除', [
        { text: '取消', onPress: () => { }, style: 'default' },
        {
          text: '确认删除', onPress: () => {
            deleteCategory({ id: id }, () => {
              props.history.go(-1)
            })
          }
        },
      ]);
    } else {
      deleteCategory({ id: id }, () => {
        props.history.go(-1)
      })
    }
  }


  function closeDate(type?: boolean) {
    type && fetDate({ id: id });
    setShowModal(false)
  }
 
  return (<div className={CSS.categoryDetail}>
    
    {/* 当前分类详情信息 */}
    <List renderHeader={() => '当前分类详细新信息'} >
      {item.length > 0 && item.map((it, index) => {
        return (it.value && <div className={CSS.list} key={index}>
          <div className={CSS.left}>{it.title}</div>
          <div className={CSS.right}>
            {it.value}
            {it.isBg && <span style={{ background: it.value }}></span>}
          </div>
        </div>)
      })}
    </List>

    {/* 当前分类操作 */}
    {  item.length > 0 && <div className={CSS.opBtns}>
      <Button className={CSS.btn} onClick={() => { deleteC() }} >删除</Button>
      <Button type="primary" className={CSS.btn} onClick={() => { setShowModal(true) }}>编辑</Button>
    </div>}

    {/* 编辑分类操作 */}
    {isShowEditModal && <AddCategory onCancel={closeDate} onConfirm={() => { closeDate(true) }} item={sourceItem}></AddCategory>}

  </div>)
}
export default CategoryDetail;