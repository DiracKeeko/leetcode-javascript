/*
 * [738] 单调递增的数字
 */

/* 
  当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。

  给定一个整数 n ，返回 小于或等于 n 的最大数字，且数字呈 单调递增 。
*/

/* 
示例 1:
  输入: n = 10
  输出: 9

示例 2:
  输入: n = 1234
  输出: 1234

示例 3:
  输入: n = 332
  输出: 299
*/

/**
 * @param {number} n
 * @return {number}
 */
var monotoneIncreasingDigits = function (n) {
  let s = n.toString(10);
  let arr = s.split("").map(item => Number(item));
  let flag;
  for (let i = arr.length - 1; i > 0; i--) {
    let cur = arr[i];
    let pre = arr[i - 1];
    if (cur >= pre) {
      continue;
    } else {
      /* 
      arr[i - 1] = pre - 1; 
      arr[i] = 9;
      不能用这个逻辑，否则遇到100这种情况会输出90而不是99
      */
      // 记录下最后一个反序的位置flag。将flag之后的数字全都变为9
      arr[i - 1] = pre - 1;
      flag = i;
    }
  }
  for (let j = flag; j < arr.length; j++) {
    arr[j] = 9;
  }
  const numberStr = arr.join("");
  return parseInt(numberStr, 10);
};

// 数字转化为按位数组 哪个更快？


// v2
var monotoneIncreasingDigits = function(n) {
  const arr = n.toString(10).split("").map(item => Number(item));

  let flag = arr.length;
  for (let i = flag - 1; i > 0; i--) { // 这个for循环必须从后到前迭代，这样才能找到第一个反序的位置
    if (arr[i - 1] > arr[i]) {
      flag = i;
      arr[i - 1] -= 1; 
      // 找到反序的位置之后(如32)，将前一个数减1 (3-1)，记录反序的位置(数字"2"的位置)
    }
  }
  
  for (let i = flag; i < arr.length; i++) {
    arr[i] = 9;
  }

  const numStr = arr.join("");
  return parseInt(numStr, 10);
};