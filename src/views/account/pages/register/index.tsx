/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 08:56:52
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-05 11:35:24
 */
import React, { useState } from 'react';
import { InputItem, Card, Button, Toast } from 'antd-mobile';
import CSS from './index.module.scss'
import { submitRegister } from '@account/api/index'
import { TypeProps ,TypeResponse} from '@account/pages/@type'
import { useUserName, usePassword } from '@account/pages/use-methods/index'

function Register(props: TypeProps) {

  const { username, setUserName, checkUsername, } = useUserName('');
  const { password, setPassword, checkPassword } = usePassword('');
  const [conPassword, setConPassword] = useState('');
  
  function checkForm() {
    let checkMsg = checkUsername();
    let passMsg = checkPassword();

    if (!checkMsg.res  || !passMsg.res) {
      Toast.fail(checkMsg.msg || passMsg.msg);
      return false;
    }
    if (conPassword !== password) {
      Toast.fail('确认密码和密码不一致', 1.5);
      setConPassword("")
      return false;
    }
    return true;
  }
  
  async function submit() {
    if(!checkForm()) return  
    let res:TypeResponse = await submitRegister({ username: username, password: password });
    if (res.status === 0) {
      Toast.success(res.msg, 2);
      toLogin(1);
    }
  }

  function toLogin(type?: number) {
    if (type === 1) {
      props.history.replace('/account/login');
      return false;
    }
    props.history.push('/account/login')
  }

  return (<div className={CSS.registerWrapper}>
    <Card className={CSS.loginContent}>
      <InputItem type="text" value={username} onChange={(val) => { setUserName(val) }} clear={true} placeholder="请输入姓名" labelNumber={3}>姓名</InputItem>
      <InputItem type="text" value={password} onChange={(val) => { setPassword(val) }} clear={true} placeholder="请输入密码" labelNumber={3}>密码</InputItem>
      <InputItem type="text" value={conPassword} onChange={(val) => { setConPassword(val) }} clear={true} placeholder="请输入确认密码" labelNumber={3}>确认密码</InputItem>
      <Button type="primary" size="small" className={CSS.btn} onClick={submit}>注册</Button>
      <p className={CSS.desc} onClick={() => { toLogin(0) }}>已有账号，去登录 &gt;&gt; </p>
    </Card>
  </div>)
}
export default Register