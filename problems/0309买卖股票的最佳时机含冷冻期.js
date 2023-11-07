/*
 * [309] 买卖股票的最佳时机含冷冻期
 */

/* 
  给定一个整数数组prices，其中第  prices[i] 表示第 i 天的股票价格 。​

  设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:

  卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
  注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
*/

/* 
  每一天，有4种状态
  0 空仓(解除冷冻，可买入)
  1 持有股票
  2 卖出股票
  3 冷冻期
*/

/* 
1. 确定dp数组（dp table）以及下标的含义
  dp[i][j] 表示截止第i个股票价格，j在[0, 3]状态下的最大持有现金

2. 确定递推公式
  // i日空仓可交易 => i-1日空仓可交易, i-1日是冷冻期
  dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][3])

  // i日持有股票 => i-1日持有股票，i-1日空仓&&i日买入，i-1日冷冻期&&i日买入
  dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i], dp[i - 1][3]- prices[i]);

  // i日卖出股票 => i-1日持有股票&&卖出
  dp[i][2] = dp[i - 1][1] + prices[i]

  // i日冷冻期 => i-1日卖出股票
  dp[i][3] = dp[i - 1][2]

3. dp数组如何初始化
  dp[0] = [0, -prices[0], 0, 0]

4. 确定遍历顺序
  两层for循环
    外层遍历股票价格，内层遍历状态。

5. 举例推导dp数组
*/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const dp = [[0, -prices[0], 0, 0]];
  for (let i = 1; i < prices.length; i++) {
    dp[i] = [];
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][3]);
    dp[i][1] = Math.max(
      dp[i - 1][1],
      dp[i - 1][0] - prices[i],
      dp[i - 1][3] - prices[i]
    );
    dp[i][2] = dp[i - 1][1] + prices[i];
    dp[i][3] = dp[i - 1][2];
  }
  console.table(dp);
  return Math.max(...dp[prices.length - 1]);
};

const arr = [1, 2, 3, 0, 2];
const res = maxProfit(arr);
console.log(res);
