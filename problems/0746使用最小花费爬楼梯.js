/*
 * [746] 使用最小花费爬楼梯
 */

/* 
  给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。

  你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。

  请你计算并返回达到楼梯顶部的最低花费。
*/

/* 
  示例 1：

  输入：cost = [10,15,20]
  输出：15
  解释：你将从下标为 1 的台阶开始。
  - 支付 15 ，向上爬两个台阶，到达楼梯顶部。
  总花费为 15 。
*/

// 思路
/* 
  1、dp[i] 是到达第i阶楼梯需要的最小花费

  2、dp[i] = Math.min(dp[i - 2] + cost[i - 2], dp[i - 1] + cost[i - 1])

      cost = [10,15,20]
  
  3、初始化
    [0, 0]

  4、遍历顺序从前到后，从i = 2开始 到i = cost.length结束
  
  5、dpArr [0, 0, 10, 15]

  返回dp[cost.length]
*/

/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
  const dp = [0, 0];
  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(dp[i - 2] + cost[i - 2], dp[i - 1] + cost[i - 1]);
  }
  return dp.pop();
};

// v2  用if执行效率最高，但是做题的时候最好是用Math.min(), Math.min()语义更直观
var minCostClimbingStairs = function(cost) {
  const dp = [0, 0];
  for (let i = 2; i <= cost.length; i++) {
    dp[i] = dp[i - 1] + cost[i - 1];
    if (dp[i] > dp[i - 2] + cost[i - 2]) {
      dp[i] = dp[i - 2] + cost[i - 2];
    }
  }
  return dp.pop();
};