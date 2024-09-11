/*
 * [123] 买卖股票的最佳时机 III
 */

/* 
  给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。

  设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。

  注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
*/

/* 
动态规划求解
1. 确定dp数组（dp table）以及下标的含义
  一天一共就有五个状态，
  没有操作 （可以不设置这个状态）
  第一次持有股票 状态1
  第一次不持有股票 状态2
  第二次持有股票 状态3
  第二次不持有股票 状态4
  dp[i][j]中 i表示第i天，j为 [1 - 4] 4个状态任取，dp[i][j]表示第i天状态j所持有最大现金。

    即 dp[i][1] 表示 第i天什么都不操作第一次持有股票

2. 确定递推公式
  dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
  dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i])
  dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i])
  dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i])

3. dp数组如何初始化
  dp[0][1] = -prices[0];
  dp[0][2] = 0;
  dp[0][3] = -prices[0];
  dp[0][4] = 0;

4. 确定遍历顺序
  从i = 1开始，从前到后

5. 举例推导dp数组

*/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const dp = [[]];
  dp[0][1] = -prices[0];
  dp[0][2] = 0;
  dp[0][3] = -prices[0];
  dp[0][4] = 0;

  for (let i = 1; i < prices.length; i++) {
    dp[i] = [];
    // 优化 cur = prices[i]
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]); 
    dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i]);
    dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i]);
    dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i]);
  }

  return dp[prices.length - 1][4];
};


// 下面的贪心算法会失败
var maxProfit = function(prices) {
  const diffArr = [];

  let diffAcc = 0;
  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) {
      diffAcc += diff;
    } else {
      diffArr.push(diffAcc);
      diffAcc = 0;
    }
  }
  diffArr.push(diffAcc);

  diffArr.sort((a, b) => b - a);
  console.log(diffArr);
  const resArr = diffArr.slice(0, 2);
  return resArr.reduce((acc, cur) => acc + cur, 0);
};

/* 
  贪心算法无法正确处理交易次数

  如这样的输入 [1,2,4,2,5,7,2,4,9,0]
  输出的diffArr为 [ 7, 5, 3, 0 ]
  两次交易的返回结果是 12，正确答案是13
*/