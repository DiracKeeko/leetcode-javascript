/*
 * [70] 爬楼梯
 */

/* 
  假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

  每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
*/

// 思路
/* 
  dp[i] 是爬到第i个台阶可用的方案数目

  dp[i] = dp[i - 1] + dp[i - 2];
  走到第i阶楼梯的方案数 = 
    走到第i-1阶楼梯的方案数(从i-1台阶出发 走1阶) + 走到第i-2阶楼梯的方案数(从i-2台阶出发 走2阶)
  
  初始化：
    dp[1] = 1;
    dp[2] = 2;
  
  遍历顺序:
    从3开始，直到n  [3, n]
  
  dpTable -> [0, 1, 2, 3, 5]
  
  返回 dp[n]
*/

/**
 * @param {number} n
 * @return {number}
 */

// 针对题目的v1
var climbStairs = function(n) {
  const steps = [1, 2];
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < steps.length; j++) {
      if (i >= steps[j]) {
        dp[i] += dp[i - steps[j]];
      }
    }
  }

  return dp[n];
};

// 针对题目的v2
var climbStairs = function(n) {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= 2; j++) {
      if (i >= j) {
        dp[i] += dp[i - j];
      }
    }
  }

  return dp[n];
};

// 爬楼梯进阶版 目标是走到第n阶楼梯，每次可以走1, 2, ..., m步
// 进阶版的爬楼梯
var climbStairs = function(n, m) {
  const dp = Array(n + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (i >= j) {
        dp[i] += dp[i - j];
      }
    }
  }
  return dp[n];
};