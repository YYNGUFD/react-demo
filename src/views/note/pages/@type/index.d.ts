/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-05 09:12:07
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-05 10:06:29
 */
import {typeItems} from '@category/pages/@type'
interface TypeItem{
  beginTime: string,
  createTime: string,
  endTime: string,
  title: string,
  status: number,
  desc?: string,
  categoryId?:typeItems,
 
  
}
export interface TypePorps {
  item: TypeItem,
  history?:any
}