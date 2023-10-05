/*
 * [225] 用队列实现栈
 */

/* 
  请你仅使用两个队列实现一个后入先出（LIFO）的栈，并支持普通栈的全部四种操作（push、top、pop 和 empty）。
 */

var MyStack = function() {
  this.queue1 = [];
  this.queue2 = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.queue1.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
  if (this.queue1.length === 0) {
    [this.queue1, this.queue2] = [this.queue2, this.queue1];
  }
  
  while (this.queue1.length > 1) {
    this.queue2.push(this.queue1.shift());
  }
  return this.queue1.shift();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
  const res = this.pop();
  this.queue1.push(res);
  return res;
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.queue1.length === 0 &&  this.queue2.length === 0;
};


// 思路
/* 

  栈 [] 进|出

  队列1  出 [] 进
  队列1  出 [] 进
  

  实现栈的pop()
  1、
  队列1  出 [1, 2, 3] 进
  队列2  出 [] 进
  
  2、
  队列1  出 [3] 进
  队列2  出 [1, 2] 进
  
  3、
  队列1  出 [3] 进
  队列1 shift() 
  
  4、
  队列1  出 [] 进
  队列2  出 [1, 2] 进
  
  
  实现栈的top()
  获取pop()的结果,并暂存
  将pop的结果push回队列1
  返回暂存的结果

*/