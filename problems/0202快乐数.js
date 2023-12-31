/*
 * [202] 快乐数
 */

/* 
  编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」 定义为：

  对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
  然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
  如果这个过程 结果为 1，那么这个数就是快乐数。
  如果 n 是 快乐数 就返回 true ；不是，则返回 false 。
*/

/* 
输入：n = 19
输出：true
  解释：
  12 + 92 = 82
  82 + 22 = 68
  62 + 82 = 100
  12 + 02 + 02 = 1
*/

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function(n) {
  const obj = {};
  while (true) {
    if (n === 1) {
      return true;
    }
    if (n in obj) {
      return false;
    }
    obj[n] = 1;

    n = getNum(n); 
  }
  function getNum(n) {
    let sum = 0;
    while(n) {
      sum += (n % 10) ** 2;
      n = parseInt(n / 10);
    }
    return sum;
  }
};

// 类比成一个循环链表
var isHappy = function(n) {
  let fast = getNum(getNum(n)); // 不能初始化为n, 否则输入n = 10结果就有问题
  let slow = getNum(n);
  while (fast !== 1 && slow !== 1) {
    fast = getNum(getNum(fast));
    slow = getNum(slow);
    if (fast === slow) {
      return false;
    }
  }
  return true;
  
  function getNum(n) {
    let sum = 0;
    while(n) {
      sum += (n % 10) ** 2;
      n = parseInt(n / 10);
    }
    return sum;
  }
};