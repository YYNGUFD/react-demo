/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:03:58
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-05 09:27:45
 */
import axios from '@service/fetchConfig'
import api from './api'

export async function getNoteList(params?: any) {
  let resp = await axios.post('/note/getNoteList', params);
  return resp;
}

//添加笔记
export async function addNote(params?: any) {
  let resp = await axios.post('/note/addNote',params);
  return resp;
}



/**
 * 获取单个计划详细信息
 * @param {*} params 
 */
export const getNoteDetail = async function(params) {
  const resp = await axios.post(api.getNoteDetail, params);
  return resp;
}

/**
 * 完成计划
 */
export const completeNote = async function(params) {
  const resp = await axios.post(api.completeNote, params);
  return resp;
}


/**
 * 删除计划
 */
export const deleteNote = async function(params) {
  const resp = await axios.post(api.deleteNote, params);
  return resp;
}

/**
 * 
 * @param {*} params 
 */

 export const beginNote = async function(params){
   const resp = await axios.post(api.beginNote,params);
   return resp;
 }


/**
 * 筛选计划
 */

 export const getNoteListStatus = async function(params){
  const resp = await axios.post(api.getNoteListStatus, params);
  return resp;
 }

 /**
  * 获取初始化筛选列表
  */
 export const  getInitPanel = async function(params){
  const resp = await axios.post(api.getInitPanel, params);
  return resp;
 }

