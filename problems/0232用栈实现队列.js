/*
 * [232] 用栈实现队列
 */

/* 
  请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

实现 MyQueue 类：

  void push(int x) 将元素 x 推到队列的末尾
  int pop() 从队列的开头移除并返回元素
  int peek() 返回队列开头的元素
  boolean empty() 如果队列为空，返回 true ；否则，返回 false
  说明：

  你 只能 使用标准的栈操作 —— 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
  你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
*/
var MyQueue = function() {
  this.stack1 = [];
  this.stack2 = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.stack1.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  if (this.stack1.length === 0) {
    return null;
  }

  while (this.stack1.length > 1) {
    this.stack2.push(this.stack1.pop());
  }
  const res = this.stack1.pop();
  while (this.stack2.length) {
    this.stack1.push(this.stack2.pop());
  }
  return res;
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  if (this.stack1.length === 0) {
    return null;
  }

  while (this.stack1.length > 1) {
    this.stack2.push(this.stack1.pop());
  }
  const res = this.stack1.pop();
  this.stack2.push(res);
  while (this.stack2.length) {
    this.stack1.push(this.stack2.pop());
  }
  return res;
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return this.stack1.length === 0;
};

/* 
  stackIn   [] 进|出
  stack2  [] 进|出

  实现队列的pop(); (得到1)
  1、
  stackIn   [1, 2, 3] 进|出
  stack2  [] 进|出
  
  2、
  stackIn   [1] 进|出
  stack2  [3, 2] 进|出

  3、
  stackIn   [] 进|出 -> 弹出1
  stack2  [3, 2] 进|出

  4、
  stackIn   [2, 3] 进|出
  stack2  [] 进|出

*/