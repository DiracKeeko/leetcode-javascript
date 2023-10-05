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
  this.stackIn = [];
  this.stackOut = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.stackIn.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  if (this.stackOut.length !== 0) {
    return this.stackOut.pop();
  }

  while (this.stackIn.length !== 0) {
    this.stackOut.push(this.stackIn.pop());
  }
  return this.stackOut.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  const res = this.pop();
  this.stackOut.push(res);
  return res;
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return this.stackIn.length === 0 && this.stackOut.length === 0;
};

/* 
  stackIn   [] 进|出
  stackOut  [] 进|出

  实现队列的pop(); (得到1)
  1、
  stackIn   [1, 2, 3] 进|出
  stackOut  [] 进|出
  
  2、
  stackIn   [1] 进|出
  stackOut  [3, 2] 进|出

  3、
  stackIn   [] 进|出 -> 弹出1
  stackOut  [3, 2] 进|出

  4、 再次pop()
  stackIn   [] 进|出
  stackOut  [3] 进|出  -> 弹出2

*/