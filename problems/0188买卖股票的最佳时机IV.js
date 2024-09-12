/*
 * [188] 买卖股票的最佳时机 IV
 */

/* 
  给你一个整数数组 prices 和一个整数 k ，其中 prices[i] 是某支给定的股票在第 i 天的价格。

  设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。也就是说，你最多可以买 k 次，卖 k 次。

  注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
*/

/* 
  输入：k = 2, prices = [2,4,1]
  输出：2
  解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
*/

/* 
1. 确定dp数组（dp table）以及下标的含义
  dp[i][2k - 1] 表示在第k天持有股票状态的最大现金数量
  dp[i][2k] 表示在第k天不持有股票状态的最大现金数量

2. 确定递推公式
  dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i])
  dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i])
  dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i])

  ...
  dp[i][2k - 1] = Math.max(dp[i - 1][2k - 1], dp[i - 1][2k - 2] - prices[i]);
  dp[i][2k] = Math.max(dp[i - 1][2k], dp[i - 1][2k - 1] + prices[i]);

3. dp数组如何初始化
  dp[0][0] = 0;

  dp[0][2k - 1] = -prices[i];
  dp[0][2k] = 0;

4. 确定遍历顺序
  从前到后，两层for循环，外层遍历股票价格，内层遍历天数k

5. 举例推导dp数组
*/

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */

// v1
var maxProfit = function (k, prices) {
  const dp = [[0]];
  for (let j = 1; j <= k; j++) {
    dp[0][2 * j - 1] = -prices[0];
    dp[0][2 * j] = 0;
  }

  for (let i = 1; i < prices.length; i++) {
    dp[i] = [0];
    for (let j = 1; j <= k; j++) {
      dp[i][2 * j - 1] = Math.max(
        dp[i - 1][2 * j - 1],
        dp[i - 1][2 * j - 2] - prices[i]
      );
      dp[i][2 * j] = Math.max(
        dp[i - 1][2 * j],
        dp[i - 1][2 * j - 1] + prices[i]
      );
    }
  }
  console.table(dp);
  return dp[prices.length - 1][2 * k];
};

// v2 不一样的取j的方式，最终实现效果相同
var maxProfit = function(k, prices) {
  const len = prices.length;
  const dp = [[]];
  for (let j = 0; j < 2 * k + 1; j++) {
    if (j % 2 === 0) {
      dp[0][j] = 0;
    } else {
      dp[0][j] = -prices[0];
    }
  }

  for (let i = 1; i < len; i++) {
    const cur = prices[i];
    dp[i] = [0];
    for (let j = 1; j < 2 * k + 1; j++) {
      if (j % 2 === 0) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] + cur);
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] - cur);
      }
    }
  }
  return dp[len - 1][2 * k];
};

const k = 2,
  arr = [3, 2, 6, 5, 0, 3];
const res = maxProfit(k, arr);
console.log("res->", res);
