/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-03-02 16:51:06
 * @LastEditors: Mfy
 * @LastEditTime: 2021-03-02 16:54:10
 */
Function.prototype.before = function (beforefn) {
  var _this = this;//保持函数原始引用；
  return function () {//返回了包含原函数和新函数的代理函数
    beforefn.apply(this, arguments);//先执行当前要先执行的函数
    return _this.apply(this, arguments);//在执行原函数

  }
}

Function.prototype.after = function (afterFn) {
  var _this = this;//保持函数原始引用；
  return function () {//返回了包含原函数和新函数的代理函数
    var ret = _this.apply(this, arguments);//在执行原函数
    afterFn.apply(this, arguments);//先执行当前要先执行的函数
    return ret;//返回原函数
  }
}

export { }