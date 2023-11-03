/* 

[322] 零钱兑换

给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。

计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。

你可以认为每种硬币的数量是无限的。
*/

/* 
dp五步
1. 确定dp数组（dp table）以及下标的含义
  dp[j] 表示从coins [0, i]之间任取硬币, 凑齐j所需要的最小数量。

2. 确定递推公式
  dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);

3. dp数组如何初始化
  dp 全部填充Infinity, dp[0] = 0;

4. 确定遍历顺序
  两层for循环, 先容量 再物品

5. 举例推导dp数组
*/
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let j = 1; j <= amount; j++) {
    for (let coin of coins) {
      if (j >= coin) {
        dp[j] = Math.min(dp[j], dp[j - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
};
