/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 15:09:06
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-02 17:13:32
 */
export interface TypeProps{
  history: any,
  location: any,
  render?:any
}
export interface TypeResponse{
  status: number,
  msg?: string,
  data?:any
}