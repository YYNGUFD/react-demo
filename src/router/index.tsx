/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-01 16:40:39
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-03 14:43:43
 */
import React from 'react'
import Loadable from 'react-loadable' 
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import accountRouteList from '../views/account/routers/index'
import noteRouteList from '../views/note/routers/index'
import categoryRouteList from '@category/routers/index'
const RouterList = [ 
   ...noteRouteList,
  ...accountRouteList,
  ...categoryRouteList
]
console.log(RouterList)
 
function RouterMap() { 
   
    return (
      <Router>
        <Switch> 
          {RouterList.map(route => {  
            var Component:any = Loadable({
                loader:route.component,
                loading: () => (<div>页面加载中.....</div>)
            })  
            return  <Route
                key={route.path}  
                exact
                path={route.path} 
                render={props => { 
                  
                  //页面title设置
                  var title = (route.meta && route.meta.title) || "我的内容"
                  document.title = title;
                  console.log(route)
               
                  return <Component  {...props}   routes={route.path}></Component>
              }} 
              />
          })} 
          <Redirect to='/'></Redirect>
        </Switch>
      </Router> 
   )
  } 

export default RouterMap;
