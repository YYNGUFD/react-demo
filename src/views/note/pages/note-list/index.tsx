import React, { PureComponent,useState,useReducer,useEffect,useRef } from 'react';
import { Tabs, WhiteSpace, Badge ,Icon} from 'antd-mobile';
import { getNoteListStatus ,getInitPanel} from "@note/api/index";
import NoteItem from '../widget/note-item/index'
import CSS from './index.module.scss'
import { statusMap} from '@note/pages/mixins/index'
import TimePanel from './widget/panel/index'
let  tabList = [];
for (var key in statusMap) {
  tabList.push({
    sub: parseInt(key),
    title: statusMap[key]["value"],
  });
}
tabList.unshift({ sub: 9, title: "全部" });


const initState = {
  noteList:[], 
  page:1,
  loadCom:false,
  total:10
}

//创建action
const REQUEST_NOTELIST = "REQUEST_NOTELIST";
const RECEIVE_NOTELIST = "RECEIVE_NOTELIST";
//开始请求
const requestGoodsList = () =>({
  type: REQUEST_NOTELIST
});

//接收到数据
const receiveGoodsList = res=> ({
  type: RECEIVE_NOTELIST,
  res:res
});
const addPage = ()=>({
  type:'ADD_PAGE', 
})

const fetchNoteList =async (params, dispatch,type) =>{
  type &&  dispatch(requestGoodsList()); 
  let res =  await getNoteListStatus(params);
  dispatch(receiveGoodsList(res))
};


function enReducer(state,action){
  //获取数据
  switch(action.type){
    case 'REQUEST_NOTELIST':{
      console.log("执行")
        return { noteList:[], page:1, loadCom:false}; 
    }
    case 'ADD_PAGE':{
      let newState = {...state};
      ++ newState.page; 
      console.log("ADD_PAGE");
      return newState
    }
    case 'RECEIVE_NOTELIST':{
      let res =  action.res;
      let newState = {...state} 
      if(res.status == 0 ){
        newState.total = res.data.total; 
        if(state.page ==1){
           newState.noteList = res.data.list;
        }else{
          newState.noteList.concat(res.data.list)
        }
        if(state.page ==1 && res.data.list.length ==0){
          newState.isEmpty = true;
        }
        if( newState.noteList.length  ==res.data.total ){
          newState.loadCom = true;
        } 
      }else{

      } 
      return newState;    
    } 
  } 
}

function usePancel(){
  let [panObj,setPanObj] = useState({categoryList:[],timeList:[]})
  async function fetchPancel(cb?){
    let res = await getInitPanel();
    if(res.status == 0){
      setPanObj(res.data)
      setTimeout(()=>{
        cb && cb(true)
      })
    }else{
      cb && cb(false)
    }
  }
  return {panObj,fetchPancel};
}

function NoteList(){
  let [activeTab,setActiveTab] = useState(9);
  let [initdata,dispatch] = useReducer(enReducer,initState);
  let [isLoad,setLoad] = useState(false)
  let ref = useRef()
  let {panObj,fetchPancel} = usePancel();
  let [showPanel,setPanel] = useState(false);
  let [selectMsg,setSelectMsg] =useState({time:"",categoryId:""}) 

  function confirmSelect(params){
    setPanel(false);
    setSelectMsg(params)
    //存储当前时间
    fetchNoteList({page:1,status:activeTab,...params},dispatch,true)
  }

 
  useEffect(() => {
  //获取pancel
   fetchPancel()
   //获取数据 用于获取内容
   fetchNoteList({page:1,status:activeTab},dispatch,true)
   //绑定页面进行scroll监听
   window.addEventListener('scroll',handler,false)
   
   return ()=>{
    window.removeEventListener('scroll',()=>{

    },false)
   }

  }, []);
  
  //page 发生了更改了===
  useEffect(() => {
    if(initdata.page>1 && !isLoad){
      fetchNoteList({page:initdata.page,status:activeTab,...selectMsg},dispatch,false)
    } 
  }, [initdata.page,isLoad]);
 
  //数据请求回来了---
  useEffect(() => {
    initdata.noteList.length>0 && setLoad(false)
  }, [initdata.noteList]);


  function handler(){
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
  
    // 滑动翻页
    if(!initdata.isEmpty && !initdata.loadCom && scrollHeight > clientHeight && scrollTop + clientHeight >= scrollHeight - 20) {
       dispatch(addPage());
       setLoad(true)
    }
  } 

  function onTabClick(tab,index){
   if(tab.sub != activeTab){
    setActiveTab(tab.sub)
    fetchNoteList({page:1,status:activeTab,...selectMsg},dispatch,true);
   } 
  } 
  let { noteList,isEmpty} = initdata;
  return (<div className={CSS.noteWrapper}>
  <div className={CSS.fixTab}> 
   <Tabs tabs={tabList} 
      initialPage={0} 
      renderTab={tab => <span>{tab.title}</span>}
      onTabClick={onTabClick}
    >  
    </Tabs>
    <Icon type="ellipsis" color={selectMsg.time ? "red":'#666'} className={CSS.icon} onClick={()=>{setPanel(true)}}></Icon>
    </div>
    {/* 内容区域 */}
    
    {!isEmpty && <div className={CSS.noteWrapper} ref={ref}> 
     {noteList.length > 0 && noteList.map((item, index) => {
        return (<NoteItem item={item} key={index} ></NoteItem>)
      })}
    </div>}
    {isEmpty && <div className={CSS.empty}>暂无数据 </div>}
   { showPanel && <TimePanel selectMsg = {selectMsg} timeList={panObj.timeList} confirmSelect={confirmSelect} categoryList={panObj.categoryList}></TimePanel>}
  </div>)
}
export default NoteList;