/*
 * [494] 目标和
 */

/* 
  向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：

  例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
  返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
*/

/* 
  输入：nums = [1,1,1,1,1], target = 3
  输出：5
  解释：一共有 5 种方法让最终目标和为 3 。
  -1 + 1 + 1 + 1 + 1 = 3
  +1 - 1 + 1 + 1 + 1 = 3
  +1 + 1 - 1 + 1 + 1 = 3
  +1 + 1 + 1 - 1 + 1 = 3
  +1 + 1 + 1 + 1 - 1 = 3
*/

/* 
  思路：
    有加有减，找到目标和target
    
    记nums的总和为sum
    则有 x - (sum - x) = target 
    那么得到 x = (target + sum) / 2

    转化为背包问题，找到让目标值x的 放置方法数量

    => 装满容量为x的背包，有多少种方法

*/

/* 
  dp五步
  1. 确定dp数组（dp table）以及下标的含义
    二维数组dp[i][j] 在[0, i]之间任选，装满容量为j的背包有dp[i][j]种方案。

  2. 确定递推公式
    dp[i][j] = nums[i] === j
                ? dp[i-1][j] + 1
                : dp[i-1][j] + dp[i-1][j-nums[i]]

              
    如果nums[i] === j, dp[i][j] = 不放数字nums[i]的方案数(dp[i-1][j]) + 自己本身放入产生的唯一一种方案(1)
    如果nums[i] !== j, dp[i][j] = 不放数字nums[i]的方案数(dp[i-1][j]) + 数字放入刚好能凑成j的方案数(dp[i-1][j-nums[i]])

    如果按照3.2的初始化方案，递推公式变为
    dp[i][j] = dp[i-1][j] + dp[i-1][j-nums[i]]

  3. dp数组如何初始化
  对 [1,1,1,1,1] 的输入

    3.1 第一种初始化
    全部严格按照dp[i][j]的含义来初始化 (第一列填充0， 第一行填充0，之后dp[0][nums[0]] = 1)
      [
        [0, 1, 0, 0, 0],
        [0],
        [0],
        [0],
        [0]
      ]

      也可以这样初始化
      [
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]

    3.2 第二种初始化
      ```
      如果不严格按照dp[i][j]定义，为了追求递推公式的精简
        ( 简化为 dp[i][j] = dp[i-1][j] + dp[i-1][j-nums[i]] )
      那么可以将dp[i][0] 初始化为 1
        [
          [1, 1, 0, 0, 0],
          [1],
          [1],
          [1],
          [1]
        ]
      ```

      // 补充

  4. 确定遍历顺序
    两层for循环，先循环物品i 再循环背包容量j
    i, j 都是从小到大 

    4.1 按照3.1的初始化方案
    i从1开始，j从0开始  (必须从0开始，要考虑数组中有0的情况)
    可能会出现越界，而且当数组中出现 [0, 0, 0, 1]这种情况时，很有问题。

    4.2 按照3.2的初始化方案
    i从1开始，j从1开始

  5. 举例推导dp数组
    nums = [1,1,1,1,1], target = 3;
    => sum = 5; x = (target + sum) / 2 = 4

    dp[i][j] = 
      // 0  1  2  3  4
      [
        [0, 1, 0, 0, 0],
        [0, 2, 1, 0, 0],
        [0, 3, 3, 1, 0],
        [0, 4, 6, 4, 1],
        [0, 5, 10, 10, 5]
      ]

    
    nums = [1,2,2,1], target = 2;
    => sum = 6; x = (target + sum) / 2 = 4

    dp[i][j] = 
      // 0  1  2  3  4
      [
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 2, 2, 1],
        [0, 2, 3, 4, 3],
      ]

    nums = [1,2,2,3], target = 2;
    => sum = 8; x = (target + sum) / 2 = 5

    dp[i][j] = 
      // 0  1  2  3  4  5
      [
        [0, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 1, 2, 2, 1, 1],
        [0, 1, 2, 3, 2, 2],
      ]
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function(nums, target) {
  const len = nums.length;
  if (len === 1) {
    if (nums[0] === target || nums[0] === -target) {
      return 1;
    }
    return 0;
  }
  const sum = nums.reduce((acc, cur) => acc + cur, 0);
  if ((sum + target) % 2 === 1) {
    return 0; // 取不出一个整数，没有方案
  }
  if (target > sum) {
    return 0; // target > sum 全都加起来也达不到sum，没有方案
  }

  const x = (sum + target) >> 1;

  const dp = Array(len)
    .fill(0)
    .map(() => Array(x + 1).fill(0));
  dp[0][nums[0]] = 1;

  for (let i = 1; i < len; i++) {
    for (let j = nums[i]; j <= x; j++) {
      if (j === nums[i]) {
        dp[i][j] = dp[i - 1][j] + 1;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i]];
      }
    }
  }
  return dp[len - 1][x];
};

const nums = [1, 1, 1, 1, 1];
// const nums = [0, 0, 0, 0, 1];
const target = 1;
const res = findTargetSumWays(nums, target);
console.log("res->", res);
