/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-03 14:58:28
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-03 18:22:18
 */
import {TypeItems} from '@category/pages/@type/index'
export interface TypeProps {
  onCancel?: function,
  onConfirm?: function,
  item?:TypeItems 
}