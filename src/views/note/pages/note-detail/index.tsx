import React, { useEffect, useState } from 'react';
import CSS from './index.module.scss'
import { useNoteDetail } from '@note/@use-methods/index'
import { getUrlParams } from '@utils/common'
import { Toast, List, Button } from 'antd-mobile'
import { statusBtnMap, buttonsMap } from './data'
import {statusMap} from '@note/pages/mixins/index'
import { completeNote, beginNote, deleteNote } from '@note/api/index'
let Item = List.Item

/**
 * 按钮操作
 */
function opBtn(type, params?: any, cb?) {
  let opFun = {
    async onComplete() {
      let res = await completeNote(params);
      if (res.status == 0) {
        cb(true)
      }
    },
    async beginNote() {
      let res = await beginNote(params);
      if (res.status == 0) {
        cb(true)
      }
    },
    back() {
      window.history.go(-1);
    },
    onEdit() {
      window.location.href = "/note/add-note?id=" + params.id;
    },
    async deleteNoteL() {
      let res: any = await deleteNote(params);
      if (res.status == 0) {
        Toast.success({
          content: res.msg,
          onClose() {
            window.history.go(-1);
          },
        });
      }
    }
  }
  switch (type) {
    case 0: opFun.deleteNoteL(); break;
    case 1: opFun.onEdit(); break;
    case 2: opFun.onComplete(); break;
    case 3: opFun.back(); break;
    case 4: opFun.beginNote(); break;
  }
}

function NoteDetail(props: any) {
  let { item, fetchItem } = useNoteDetail();
  let [data, setData] = useState({
    btnMap: [],
    dataList: []
  })
  let id = getUrlParams('id')
  //按钮操作函数
  let opBtnFn = function (type) {
    if (type == 1) {
      props.history.push('/note/add-note?id=' + id)
      return false;
    }
    opBtn(type, { id: id }, (res) => {
      res && fetchItem({ id: id })
    })
  };

  useEffect(() => {
    Toast.loading("")
    fetchItem({ id: id }, (res) => {
      res && Toast.hide()
    })
    return () => {
    };
  }, []);

  useEffect(() => { 
    // item 内容获取到了
    if (item) {
      const title = {
        leftValue: "计划名称",
        rightValue: item.title || '',
      };
      const category = {
        leftValue: "所属类别",
        rightValue: item.categoryId.value,
      };
      const createTime = {
        leftValue: "创建日期",
        rightValue: item.createTime,
      };
      const beginDate = {
        leftValue: "开始日期",
        rightValue: item.beginTime,
      };
      const endDate = {
        leftValue: "结束日期",
        rightValue: item.endTime,
      };
      const desc = {
        leftValue: "备注",
        rightValue: item.desc,
      };
      setData({
        dataList: [title, category, createTime, beginDate, endDate, desc],
        btnMap: statusBtnMap[item.status].buttons
      });
      console.log(data.btnMap)

    }
  }, [item]);


  return <div className={CSS.noteDetail}>
    { item && <p 
      className={'iconfont ' + statusMap[item.status].icon + ' '+ CSS.icon}
      style={{ color: statusMap[item.status].color }}
    ></p>}
    <List>
      {
        data.dataList.map((itm, index) => {
          return item.rightValue != "" ? (<Item extra={itm.rightValue} key={index}>{itm.leftValue}</Item>) : ''
        })
      }
    </List>
    <div className={CSS.btnWrapper}>
      {data.btnMap.map((item, index) => {
        let currBtn = buttonsMap[item]
        return <Button type={currBtn.type} key={index + 'o'} className={CSS.btn} onClick={() => { opBtnFn(currBtn.key) }}>{currBtn.value}</Button>
      })}
    </div>
  </div>
}
export default NoteDetail;