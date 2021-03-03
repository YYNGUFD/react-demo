/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-01 16:08:58
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-02 17:44:28
 */
import React from 'react';
import ReactDOM from 'react-dom'; 
import reportWebVitals from './reportWebVitals';
import Router from './router/index'
import './style/reset.scss'
import './style/reset-antd.scss'
import '@utils/fun-expend.js'

import 'antd-mobile/dist/antd-mobile.css'; 

ReactDOM.render( 
  <Router />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
