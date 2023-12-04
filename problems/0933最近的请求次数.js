/*
 * [933] 最近的请求次数
 */

/* 
  写一个 RecentCounter 类来计算特定时间范围内最近的请求。
  请你实现 RecentCounter 类：

  RecentCounter() 初始化计数器，请求数为 0 。
  
  int ping(int t) 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 [t-3000, t] 内发生的请求数。

  保证 每次对 ping 的调用都使用比之前更大的 t 值。
*/

// v1 用数组，会超时
var RecentCounter = function() {
  this.counter = {};
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  this.counter[t] = 1;
  const keyArr = Object.keys(this.counter);
  let index = 0;
  
  while (keyArr[index] < t - 3000) {
    delete this.counter[keyArr[index]];
    index += 1;
  }
  console.log("res->", Object.keys(this.counter).length);
  return Object.keys(this.counter).length;
};


// v2
var RecentCounter = function() {
  this.queue = [];
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  this.queue.push(t);
  while (this.queue[0] < t - 3000) {
    this.queue.shift();
  }
  console.log("v2 res->", this.queue.length);
  return this.queue.length;
};

const rc = new RecentCounter();
rc.ping(1);
rc.ping(100);
rc.ping(3001);
rc.ping(3002);