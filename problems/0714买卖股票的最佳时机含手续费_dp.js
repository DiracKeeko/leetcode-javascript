/*
 * [714] 买卖股票的最佳时机含手续费
 */

/* 
给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
*/

/* 
  输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
  输出：8

  解释：能够达到的最大利润:  
  在此处买入 prices[0] = 1
  在此处卖出 prices[3] = 8
  在此处买入 prices[4] = 4
  在此处卖出 prices[5] = 9
  总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8
*/

/* 
  分析：只在卖出的时候减去手续费就可以了

dp五步
1. 确定dp数组（dp table）以及下标的含义
  dp[i][0] 在第i天，不持有股票的最多现金
  dp[i][1] 在第i天，持有股票的最多现金

2. 确定递推公式
  dp[i][0] = Math.max(dp[i-1][1] + prices[i] - fee, dp[i-1][0])
  第i天不持有股票
    第i-1天持有，第i天卖出  => dp[i-1][1] + prices[i] - fee
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
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
  const dp = [[0, -prices[0]]];

  for (let i = 1; i < prices.length; i++) {
    dp[i] = [];
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i] - fee);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }
  return dp[prices.length - 1][0];
};

// 等价于上面的代码，做一点小小的简化
var maxProfit = function(prices, fee) {
  const len = prices.length;
  const dp = [[0, -prices[0]]];

  for (let i = 1; i < prices.length; i++) {
    const cur = prices[i];
    dp[i] = [];
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + cur - fee);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - cur);
  }
  return dp[len - 1][0];
};