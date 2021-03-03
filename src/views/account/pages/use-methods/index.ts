/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 16:24:24
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-02 17:10:09
 */

import { useState } from 'react';
  
export function useUserName(init?: string) {
  let [username, setUserName] = useState(init);
  function checkUsername() {
    let reg = /(?!^[a-zA-Z]+$)/g;
    if (!reg.test(username)) {
      return { res: false, msg: "用户名格式错误" }
    }
    return { res: true, msg: "" }
  }
  return {
    username,
    setUserName,
    checkUsername,
  }
}
export function usePassword(init?:string) {
  let [password, setPassword] = useState(init);
  function checkPassword() {
    let reg = /[0-9a-zA-Z]{3,6}/g;
    console.log(password)
    if (!reg.test(password)) {
      return {res:false,msg:"密码格式错误"}
    }
    return  {res:true,msg:""}  
  } 
  return {
    password,
    setPassword,
    checkPassword,
  }
}

