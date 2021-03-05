import {useState} from 'react';
import { getNoteDetail } from '@note/api/index'
import { TypePorps } from '@note/pages/@type/index.d'
export const useNoteDetail = function () {
  let [item, setItem] = useState(null);
  let [isFetch,setFetch] = useState(false)
  async function fetchItem(params,cb=(type?)=>{}){
    if(isFetch) return false;
    setFetch(true)
     let res = await getNoteDetail(params);
     if(res.status === 0){
       console.log(res.data)
       setItem(res.data)
       cb &&  setTimeout(()=>{
          cb(true)
        })
     }else{
      cb && setTimeout(()=>{
        cb(false)
      })
     }
     setFetch(false)
  }
  return {
    item,
    fetchItem,
  }

}
export default {}