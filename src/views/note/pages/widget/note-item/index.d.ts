/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-03 09:41:58
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 19:52:29
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
  [property]?:any,
  
}
export interface TypePorps {
  item:TypeItem
}