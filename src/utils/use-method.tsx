/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-04 10:20:02
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 10:33:31
 */
 
import React, { useRef, useState, useEffect } from 'react';
interface refType{
  current?:any,
}

export function useCallbackState(od) {
  const cbRef:refType = useRef();
  const [data, setData] = useState(od);

  useEffect(() => {
      cbRef.current && cbRef.current(data);
  }, [data]);

  return [data, function (d, callback) {
      setData(d);
      cbRef.current = callback; 
  }];
}
 
