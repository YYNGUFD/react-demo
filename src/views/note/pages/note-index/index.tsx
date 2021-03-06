/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:02:49
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-05 13:53:59
 */
import React, { useState, useEffect } from 'react';
import { getNoteList } from '@note/api/index';
import { Toast, Button } from 'antd-mobile';
import { getNowDate } from '@utils/tool'
import NoteItem from '../widget/note-item/index'
import TimeControl from '../widget/time-control/index'
import CSS from './index.module.scss' 

export const AppContext = React.createContext({});

/**
 * 列表数据请求
 * @param initList 
 */
function useList(initList?: any[]) {
  let [list, setList] = useState(initList);
  async function fetchList(params: { date: string }, cb?: Function) {
    Toast.loading("", 20, () => { }, true)
    let res = await getNoteList(params);
    if (res.status == 0) {
      setList(res.data.list)
      cb && cb(true)
    } else {
      cb && cb(false)
    }
    Toast.hide()
  }
  return {
    list,
    setList,
    fetchList,
  }
}

//使用useContext 

function NoteList(props?:{history:any}) {
  let { list, fetchList } = useList([]);

  //日历内容
  let [date, setDate] = useState(getNowDate())
  let [isFetching, setFetching] = useState(false);
  function fetchDate() {
    setFetching(true)
    fetchList({ date: date }, () => {
      setFetching(false)
    });
  }
  //首次进入 获取接口数据
  useEffect(() => {
    fetchDate()
    return () => {
    };
  }, []);

  //时间变化时候进行重新获取接口
  useEffect(() => {
    console.log("日期变化了---")
    fetchDate()
    return () => {
    };
  }, [date]); 

  function toAddNote(){
    props.history.push('/note/add-note')
  }



  return <AppContext.Provider value={{ currDate: date, setDate: setDate }}> 
    {/* 时间控制条 */}
    <TimeControl date={date} context={AppContext}></TimeControl>
    {/* 列表内容控制 */}
    <div className={CSS.listWrapper}>
      {list.length > 0 && list.map((item, index) => {
        return (<NoteItem item={item} key={index} ></NoteItem>)
      })}
    </div>
    {/* 空白内容显示 */}
    {list.length == 0 && !isFetching && <div className={CSS.empty}>
       <div>暂无数据内容</div>
    </div>}
    <div className={CSS.btnWrapper}>
      <Button type="primary" className={CSS.btn} onClick={toAddNote}>添加计划</Button>
    </div>
  </AppContext.Provider>
}
export default NoteList;