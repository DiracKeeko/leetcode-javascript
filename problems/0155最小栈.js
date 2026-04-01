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

function lastNum(arr) {
  return arr[arr.length - 1];
}

var MinStack = function() {
  this.stack = [];
  this.minStack = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
  this.stack.push(val);
  if (this.minStack.length === 0 || val < lastNum(this.minStack)) {
    this.minStack.push(val);
  } else {
    this.minStack.push(lastNum(this.minStack));
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  this.minStack.pop();
  return this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  return lastNum(this.minStack);
};

/* 
Accepted
33/33 cases passed (8 ms)
Your runtime beats 79.42 % of javascript submissions
Your memory usage beats 20 % of javascript submissions (66 MB)

*/