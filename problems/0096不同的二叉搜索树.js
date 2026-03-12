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

    dp[i] += dp[j] * dp[i - j - 1];  (j = 0开始)

    dp[i] += dp[j - 1] * dp[i - j];  (j = 1开始, j更有意义, 此时j是root节点值)

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

// 下面这种写法 j 的含义更有现实意义
var numTrees = function(n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }
  return dp[n];
};

var numTrees = function(n) {
  // 1. 初始化 dp 数组，dp[i] 表示 i 个节点能组成的 BST 数量
  const dp = new Array(n + 1).fill(0);
  
  // 2. 基础状态
  dp[0] = 1;
  dp[1] = 1;

  // 3. 开始填充 dp 表
  // i 代表当前总共有多少个节点
  for (let i = 2; i <= n; i++) {
      // j 代表以哪一个数字作为根节点
      for (let j = 1; j <= i; j++) {
          // dp[i] = Σ (以 j 为根时，左子树形态数 * 右子树形态数)
          // 左边有 j-1 个节点，右边有 i-j 个节点
          dp[i] += dp[j - 1] * dp[i - j];
      }
  }

  return dp[n];
};

numTrees(3);
