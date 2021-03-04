/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 18:33:18
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-04 11:50:04
 */
/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-10-25 20:02:33
 * @LastEditors: Mfy
 * @LastEditTime: 2020-11-17 18:07:35
 */
 
export var changeWorld= function(str){ 
  return str.replace(/[-_\s]+(.)?/g, function(match, c) {
	 	return c ? c.toUpperCase() : '';
	})
}
/**
 * 数组push数据方法
 * @param {*} obj 
 */
export var objPush = function(targetObj,pushObj){
	if(typeof targetObj =='object'){
		for(var key in pushObj){
			targetObj[key] = pushObj[key]
		}
	}
}
/**
 * 获取当前时间
 */
export var getNowDate = function(){
	 var date = new Date();
	 return date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate();
}

/**
 *  转化为时间戳哦
 * @param source 
 */

export const getDateTemp = function (date: string) { 
  var str = date.replace(/-/g,'/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串 
  var nDate = new Date(str); // 构造一个日期型数据，值为传入的字符串
  return  nDate; 
}
 
/**
 * 
 * @param source 
 */

export const changeDate=function(val){
 return  val.getFullYear() + "-"
  + (val.getMonth() + 1) + "-" + val.getDate(); 
 }
// 深拷贝
export var deepCopy = function (source){ 
  let tatget =Array.isArray(source) ?[]: {};
  for(let key in source){ 
    //包含可迭代属性
    if(source.hasOwnProperty(key)){
       //判断是否是对象 是对象要进行进一步引用操作
      if(typeof  tatget[key] =='object' && source!=null){
        tatget[key]= deepCopy(tatget[key])
      }else{
        tatget[key] = source[key]
      }
    }  
  }  
  return tatget;
}

