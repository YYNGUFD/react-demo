/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 08:56:52
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-05 11:35:05
 */
import React from 'react';
import { InputItem, Card, Button, Toast } from 'antd-mobile';
import CSS from './index.module.scss'  
import { submitLogin } from '@account/api/index'
import { getUrlParams } from '@utils/common'
import { TypeProps,TypeResponse } from '@account/pages/@type'
import { useUserName, usePassword } from '@account/pages/use-methods/index'


function Login(props:TypeProps) {
  
  const { username, setUserName, checkUsername, } = useUserName('');
  const { password, setPassword, checkPassword } = usePassword('');

  const redirectUrl = getUrlParams('redirectUrl');
  
  function checkForm() {
    let checkMsg = checkUsername();
    let passMsg = checkPassword();
    if (!checkMsg.res  || !passMsg.res) {
      Toast.fail(checkMsg.msg || passMsg.msg);
      return false;
    }
    return true;
  }

  async function submit() {
    if (!checkForm()) return;
    let res:TypeResponse = await submitLogin({ username: username, password: password });
    if (res.status === 0) {
      localStorage.setItem('token', res.data.token) 
      //跳转到首页
      if (redirectUrl) {
        window.location.href = window.atob(redirectUrl)
      } else {
        props.history.replace('/note/note-list')
      } 
    } 
  }
  function toRegister() {
    props.history.push('/account/register')
 }
  return (<div className={CSS.loginWrapper}>
    <Card className={CSS.loginContent}>
      <InputItem type="text" value={username} onChange={(val) => { setUserName(val) }} clear={true} placeholder="请输入姓名" labelNumber={3}>姓名</InputItem>
      <InputItem type="password" value={password} onChange={(val) => { setPassword(val) }} clear={true} placeholder="请输入密码" labelNumber={3}>密码</InputItem>
      <Button type="primary" size="small" className={CSS.btn} onClick={submit}>登录</Button>
      <p className={CSS.desc} onClick={toRegister}>还没账号，注册 &gt;&gt;</p>
    </Card>
  </div>)
}
export default Login