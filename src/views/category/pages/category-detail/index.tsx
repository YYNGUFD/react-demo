/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-03 14:22:51
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-03 19:13:19
 */
import React, { useState, useEffect } from 'react';
import { getCategoryDetail } from '@category/api/index'
import { List,Button } from 'antd-mobile'
import CSS from './index.module.scss'
import { getUrlParams } from '@utils/common'

const Item = List.Item;

function CategoryDetail() {
  let [item, setItem] = useState([]);
  let id = getUrlParams("id");
  async function fetCh() {
    let res = await getCategoryDetail({ id: id })
    if (res.status == 0) {
      let item = [
        { title: "分类名称", value: res.data.value },
        { title: "代表颜色", value: res.data.color, isBg: true },
        { title: "创建时间", value: res.data.createTime, },
        { title: "计划数量", value: res.data.count, }
      ]
      setItem(item)
    }
  }
  useEffect(() => {
    fetCh()
  }, []);

  return (<div className={CSS.categoryDetail}>
    
    {/* 当前分类详情信息 */}
    <List renderHeader={() =>'当前分类详细新信息'} >
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
    <div className={CSS.opBtns}>
      <Button className={CSS.btn}>删除</Button>
      <Button type="primary" className={CSS.btn}>编辑</Button> 
    </div>
  </div>)
}
export default CategoryDetail;