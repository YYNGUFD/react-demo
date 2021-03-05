/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-01 16:56:16
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-05 16:13:06
 */
import axios from 'axios'
import qs from 'qs' 
import { Toast } from 'antd-mobile'; 
const myAxios = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : ''
});


//请求拦截器
myAxios.interceptors.request.use((config) => {
  //配置数据灿睡
  config.method === 'post'
    ? config.data = qs.stringify({ ...config.data })   // 后端需要的数组类型为：'a[]=1&a[]=2&a[]=3'
    : config.params = { ...config.params };

  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  //在header中增加该校验 并带入到接口中 
  if (localStorage.token) {
    config.headers.Authorization = "Bearer " + localStorage.token
  }
  //配置内容
  return config;
})

//响应拦截器
myAxios.interceptors.response.use(response => {
  let res = response.data;
  const status = response.status 
  if (status === 401) { 
    Toast.fail(res.msg,1.5)  
  }
  if (status === 9998) {
    var url = new Buffer(window.location.href).toString('base64')
    Toast.fail(res.msg,1.5)
    window.location.replace('/client/index.html/#/account/login?redirectUrl=' + url);
  }

  return response.data; 
})
export default myAxios;