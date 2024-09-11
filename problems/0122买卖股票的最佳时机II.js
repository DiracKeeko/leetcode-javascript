/*
 * [122] 买卖股票的最佳时机 II
 */

/* 
  给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。

  在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。

  返回 你能获得的 最大 利润 。
*/

/* 
  输入：prices = [7,1,5,3,6,4]
  输出：7
  解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
      随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3 。
      总利润为 4 + 3 = 7 。
 */

/* 
  输入：prices = [1,2,3,4,5]
  输出：4
  解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4 。
     总利润为 4 。
 */

     
/* 
1. 确定dp数组（dp table）以及下标的含义
  dp[i][0] 在第i天，不持有股票的最多现金
  dp[i][1] 在第i天，持有股票的最多现金

2. 确定递推公式
  dp[i][0] = Math.max(dp[i-1][1] + prices[i], dp[i-1][0])
  第i天不持有股票
    第i-1天持有，第i天卖出  => dp[i-1][1] + prices[i]
    第i-1天不持有 => dp[i-1][0]

  dp[i][1] = Math.max(dp[i-1][1], -prices[i])
  第i天持有股票
    第i-1天持有 dp[i-1][1]
    第i-1天不持有 dp[i-1][0] - prices[i]

3. dp数组如何初始化
  dp[0][0] = 0;
  dp[0][1] = -prices[0];

4. 确定遍历顺序
  一层for循环，从前到后

5. 举例推导dp数组
*/

/**
 * @param {number[]} prices
 * @return {number}
 */
// 动态规划解法 dp v1
var maxProfit = function(prices) {
  const len = prices.length;
  const dp = [[0, -prices[0]]];
  for (let i = 1; i < len; i++) {
    const withoutStock = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    const withStock = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
    dp[i] = [withoutStock, withStock];
  }
  return dp[len - 1][0];
}

// dp v2 maxArr[i] 表示第i天能够获得的最大利润
var maxProfit = function(prices) {
  const len = prices.length;
  const dp = [0];
  for (let i = 1; i < len; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) {
      dp[i] = dp[i - 1] + diff;
    } else {
      dp[i] = dp[i - 1];
    }
  }
  return dp[len - 1];
};

// v2 优化存储空间 去掉了dp table 演变成了贪心的形式
var maxProfit = function(prices) {
  let max = 0;
  for (let i = 1; i < prices.length; i++) {
    const profit = prices[i] - prices[i - 1];
    if (profit > 0) {
      max += profit;
    }
  }
  return max;
};