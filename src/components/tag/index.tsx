import React from 'react';
import {TypetagProps} from './index.d'
import CSS from './index.module.scss'
function Tag(props:TypetagProps){
 return <div className={CSS.tagItem} style={{background:props.color}}>
  {props.value}
 </div>
}
export default Tag;