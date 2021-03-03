/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 14:56:26
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-03 16:59:05
 */
export function getUrlParams(name: string): string{
  
  let url = window.location.href
  let paramStr = url.split('?')
  if(paramStr[1]){
    const reg = new RegExp(`(^|&)${ name}=([^&]*)(&|$)`)
    const r = paramStr[1].match(reg)
    if (r != null) return  decodeURIComponent(r[2])
  }
  return '' 
}

/**
 * 验证是字母数字或英文
 * @param {*} value 输入要判断的数值
 */
export const isCCD = function(value){
  value = value.replace(/\s/,'');
  var cReg= /^[\u4e00-\u9fa5_a-zA-Z0-9_]+$/g 
  return cReg.test(value);
}