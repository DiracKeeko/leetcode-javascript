/*
 * [279] 完全平方数
 */

/* 
  给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

  完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
*/

/* 
  输入：n = 12
  输出：3 
  解释：12 = 4 + 4 + 4

  输入：n = 13
  输出：2
  解释：13 = 4 + 9
*/

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  const nums = [];
  for (let k = 1; k <= n; k++) {
    const num = k ** 2;
    if (num <= n) {
      nums.push(num);
    } else {
      break;
    }
  }

  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let j = 1; j <= n; j++) {
    for (const num of nums) {
      if (j >= num) {
        dp[j] = Math.min(dp[j], dp[j - num] + 1);
      }
    }
  }
  return dp[n] === Infinity ? -1 : dp[n];
};