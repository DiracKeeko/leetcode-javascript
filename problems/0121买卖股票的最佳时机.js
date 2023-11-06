/*
 * [121] 买卖股票的最佳时机
 */

/* 
  给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

  你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

  返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
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
    第i-1天不持有 -prices[i]  (因为只能有一次(买入)交易，所以用 0 - prices[i])

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
var maxProfit = function(prices) {
  const dp = [[0, -prices[0]]];

  for (let i = 1; i < prices.length; i++) {
    dp[i] = [];
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], - prices[i]);
  }
  console.table(dp);
  return dp[prices.length - 1][0];
};

const prices = [7,1,5,3,6,4];
const res = maxProfit(prices);
console.log("res->", res);

// 贪心算法 一层for循环，每次求左边最小和右边最大的值，再相减。 
// 下面这种每次都找最大值最小值的会超时
var maxProfit = function(prices) {
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    const min = Math.min(...prices.slice(0, i));
    const max = Math.max(...prices.slice(i));
    const curRes = max - min;
    res = Math.max(res, curRes);
  }
  return res;
};

// 贪心算法 优化 (依然不能全部通过，会超时)
var maxProfit = function(prices) {
  let res = 0;
  let min = prices[0]
  let max = Math.max(...prices.slice(1));
  res = Math.max(res, max - min);

  for (let i = 2; i < prices.length; i++) {
    const moveNum = prices[i - 1];
    if (moveNum < min) {
      min = moveNum;
    }
    if (moveNum >= max) {
      max = Math.max(...prices.slice(i));
    }
    const curRes = max - min;
    res = Math.max(res, curRes);
  }
  return res;
};