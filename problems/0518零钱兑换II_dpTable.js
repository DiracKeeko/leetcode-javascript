/*
 * [518] 零钱兑换 II
 */

/* 
  给你一个整数数组 coins 表示不同面额的硬币，另给一个整数 amount 表示总金额。

  请你计算并返回可以凑成总金额的硬币组合数。如果任何硬币组合都无法凑出总金额，返回 0 。

  假设每一种面额的硬币有无限个。 

  题目数据保证结果符合 32 位带符号整数。
*/

/* 
  输入：amount = 5, coins = [1, 2, 5]
  输出：4

  解释：有四种方式可以凑成总金额：
  5=5
  5=2+2+1
  5=2+1+1+1
  5=1+1+1+1+1
*/

/* 
dp五步
1. 确定dp数组（dp table）以及下标的含义
  dp[ix][j] (i = ix - 1) 从[0, i] 中任取硬币，恰好凑成j的方案数量

2. 确定递推公式
  dp[ix][j] = dp[ix - 1][j] + dp[ix][j - coins[i]]

  在初始化为0的情况下
  if (j < coins[iMove]) {
    dp[i][j] = dp[i - 1][j];
  } else if(j === coins[iMove]) {
    dp[i][j] = dp[i - 1][j] + 1;
  } else {
    dp[i][j] = dp[i - 1][j] + dp[i][j - coins[iMove]];
  }

  在初始化为1的情况下
  if (j < coins[iMove]) {
    dp[i][j] = dp[i - 1][j];
  } else {
    dp[i][j] = dp[i - 1][j] + dp[i][j - coins[iMove]];
  }

3. dp数组如何初始化
  行数: ix = i + 1 = coins.length + 1; (增加一行用于迭代)
  列数: j = amount + 1;
  第一行 以及 第一列都初始化为 0

4. 确定遍历顺序
  两层for循环,先遍历硬币，再遍历容量
  从ix = 0; j = 0开始迭代

5. 举例推导dp数组
*/

// 题目中后台数据要求amount为0的时候输出1

// v1 初始化为0，对amount === 0 单独处理
var change = function(amount, coins) {
  if (amount === 0) {
    return 1;
  }
  const len = coins.length;
  const dp = Array(len + 1).fill(0).map(() => Array(amount + 1).fill(0));
  for (let i = 1; i <= len; i++) {
    const iMove = i - 1;
    for (let j = 1; j <= amount; j++) {
      if (j < coins[iMove]) {
        dp[i][j] = dp[i - 1][j];
      } else if(j === coins[iMove]) {
        dp[i][j] = dp[i - 1][j] + 1;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[iMove]];
      }
    }
  }
  return dp[len][amount];
};

/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
// v2 初始化为 1
var change = function(amount, coins) {
  const len = coins.length;
  const dp = [Array(amount + 1).fill(0)];

  for (let ix = 1; ix <= len; ix++) {
    dp[ix] = [1];
    const iMove = ix - 1;
    for (let j = 1; j <= amount; j++) {
      // if judge
      if (j >= coins[iMove]) {
        dp[ix][j] = dp[ix - 1][j] + dp[ix][j - coins[iMove]];
      } else {
        dp[ix][j] = dp[ix - 1][j];
      }

      // || 0
      // dp[ix][j] = dp[ix - 1][j] + dp[ix][j - coins[ix - 1]] || 0;
    }
  }
  console.table(dp);
  return dp[len][amount];
};

const amount = 5, coins = [1,2,5];
const res = change(amount, coins);

console.log("res->", res);