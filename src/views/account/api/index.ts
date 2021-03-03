/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 09:51:36
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-02 14:54:50
 */
import axios from '@service/fetchConfig'

export async function submitLogin(params?: {
  username: string,
  password:string
}) {
  let resp = await axios.post('/account/login',params);
  return resp;
}
/**
 * 
 * @param params 
 */
export async function submitRegister(params?: {
  username: string,
  password:string
}) {
  let resp = await axios.post('/account/register',params);
  return resp;
}