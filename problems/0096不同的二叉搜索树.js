/*
 * [96] 不同的二叉搜索树
 */

/* 
  给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
 */

// 思路 
/* 
  dp五步
  1. 确定dp数组（dp table）以及下标的含义
    dp[i] 表示由i个节点组成的 二叉搜索树的种数

  2. 确定递推公式
    dp[i] = dp[0]*dp[i-1] + dp[1]*d[i-2] + dp[2]*dp[i-3] + ... + d[i-3]*d[1] + dp[i-2]*dp[0]

    dp[i] += dp[j] * dp[i - j - 1];

  3. dp数组如何初始化
    dp[0] = 1  空节点也是二叉搜索树
    dp[1] = 1  实际上不用手动初始化dp[1] 因为dp[1]可以由dp[0]推导得到

  4. 确定遍历顺序
    从前到后，从小到大

  5. 举例推导dp数组
*/

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= i - 1; j++) {
      dp[i] += dp[j] * dp[i - j - 1];
    }
  }
  return dp[n];
};