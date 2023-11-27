/*
 * [155] 最小栈
 */

/* 
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

实现 MinStack 类:

MinStack() 初始化堆栈对象。
void push(int val) 将元素val推入堆栈。
void pop() 删除堆栈顶部的元素。
int top() 获取堆栈顶部的元素。
int getMin() 获取堆栈中的最小元素。

*/

var MinStack = function() {
  this.stack = []; // 这个是最小栈
  this.mins = [Infinity]; // 用一个数组来辅助最小栈的实现
};

function last(arr) {
  return arr[arr.length - 1];
}
/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
  const minItem = Math.min(last(this.mins), val);
  this.stack.push(val);
  this.mins.push(minItem);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.stack.pop();
  this.mins.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return last(this.stack);
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return last(this.mins); 
};