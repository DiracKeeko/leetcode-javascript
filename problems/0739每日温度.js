/*
 * [739] 每日温度
 */

/* 
  给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。
*/

/* 
输入: temperatures = [73,74,75,71,69,72,76,73]
输出: [1,1,4,2,1,1,0,0]
*/

/* 
  单调栈问题
  单调栈中放置的是 "元素的下标"  这个是核心，最终产生res的时候，所用到的信息就是元素下标 
      (元素下标相减，得到结果)
*/

/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
// v1
var dailyTemperatures = function (temperatures) {
  const l = temperatures.length;
  const res = Array(l).fill(0);

  const stack = [0]; // stack记录各个元素的index, 初始index = 0
  for (let i = 1; i < l; i++) {
    let topIndex = stack[stack.length - 1];
    if (temperatures[i] > temperatures[topIndex]) {
      while (stack.length && temperatures[i] > temperatures[topIndex]) {
        res[topIndex] = i - topIndex;
        stack.pop();
        topIndex = stack[stack.length - 1];
      }
      stack.push(i);
    } else {
      stack.push(i);
    }
  }

  return res;
};

// 实测上面v1的写法比优化代码v2的写法执行效率要高很多

// 优化代码 v2
var dailyTemperatures = function (temperatures) {
  const l = temperatures.length;
  const res = Array(l).fill(0);

  const stack = [0]; // 记录各个元素的index

  for (let i = 1; i < l; i++) {
    let topIndex = stack[stack.length - 1];

    while (stack.length && temperatures[i] > temperatures[topIndex]) {
      res[topIndex] = i - topIndex;
      stack.pop();
      topIndex = stack[stack.length - 1];
    }

    stack.push(i);
  }

  return res;
};
