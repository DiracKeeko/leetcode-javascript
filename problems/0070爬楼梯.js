/*
 * [70] 爬楼梯
 */

/* 
  假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

  每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
*/

// 思路
/* 
  dp[i] 是爬到第i个台阶可用的方案

  dp[i] = dp[i - 1] + dp[i - 2];
  走到第i阶楼梯的方案数 = 
    走到第i-1阶楼梯的方案数(从i-1台阶出发 走1阶) + 走到第i-2阶楼梯的方案数(从i-2台阶出发 走2阶)
  
  dpTable -> [0, 1, 2, 3, 5]

  初始化：
    dp[1] = 1;
    dp[2] = 2;
  
  遍历顺序:
    从3开始，直到n  [3, n]
  
  返回 dp[n]
*/

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  const arr = [, 1, 2];
  for (let i = 3; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
};