/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:03:58
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 16:49:49
 */
import axios from '@service/fetchConfig'

// addNote:'/note/addNote',
// getNoteList:'/note/getNoteList',
// getNoteDetail:'/note/getNoteDetail',
// completeNote:'/note/completeNote',
// beginNote:'/note/beginNote',
// deleteNote:'/note/deleteNote',
// getNoteListStatus:'/note/getNoteListStatus',
// getInitPanel:'/note/getInitPanel'
export async function getNoteList(params?: any) {
  let resp = await axios.post('/note/getNoteList', params);
  return resp;
}

//添加笔记
export async function addNote(params?: any) {
  let resp = await axios.post('/note/addNote',params);
  return resp;
}
