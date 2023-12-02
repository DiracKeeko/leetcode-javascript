/*
 * [1472] 设计浏览器历史记录
 */

/* 
  你有一个只支持单个标签页的 浏览器 ，最开始你浏览的网页是 homepage ，你可以访问其他的网站 url ，也可以在浏览历史中后退 steps 步或前进 steps 步。

  请你实现 BrowserHistory 类：

  BrowserHistory(string homepage) ，用 homepage 初始化浏览器类。
  void visit(string url) 从当前页跳转访问 url 对应的页面  。执行此操作会把浏览历史前进的记录全部删除。
  string back(int steps) 在浏览历史中后退 steps 步。如果你只能在浏览历史中后退至多 x 步且 steps > x ，那么你只后退 x 步。请返回后退 至多 steps 步以后的 url 。
  string forward(int steps) 在浏览历史中前进 steps 步。如果你只能在浏览历史中前进至多 x 步且 steps > x ，那么你只前进 x 步。请返回前进 至多 steps步以后的 url 。
*/

/**
 * @param {string} homepage
 */
var BrowserHistory = function(homepage) {
  this.arr = [homepage];
  this.cur = 0;
};

/** 
 * @param {string} url
 * @return {void}
 */
BrowserHistory.prototype.visit = function(url) {
  this.arr.length = this.cur + 1; // 舍弃cur之后的全部
  this.arr.push(url);
  this.cur += 1;
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.back = function(steps) {
  // cur = 3; steps = 2; => cur = 1;
  // cur = 3; steps = 5; => cur = 0;
  this.cur = Math.max(0, this.cur - steps);
  return this.arr[this.cur];
};

/** 
 * @param {number} steps
 * @return {string}
 */
BrowserHistory.prototype.forward = function(steps) {
  // max = 5; cur = 2; step = 2; => cur = 4;
  // max = 5; cur = 2; step = 5; => cur = 5;
  const max = this.arr.length - 1;
  this.cur = Math.min(max, this.cur + steps);
  return this.arr[this.cur];
};