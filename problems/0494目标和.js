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

// 正数和 => 二维dp数组解法
var findTargetSumWays = function (nums, target) {
  const sum = nums.reduce((a, c) => a + c, 0);
  if (Math.abs(target) > sum) {
    return 0;
  }

  if ((sum + target) % 2 === 1) {
    return 0;
  }

  const x = ((sum + target)) >> 1;

  let dp = [[1]];
  for (let i = 1; i <= nums.length; i++) { // 这里要注意，添加了第一行，是可以取到nums[nums.length]的
    if (!dp[i]) dp[i] = [];
    for (let j = 0; j <= x; j++) {
      if (nums[i - 1] > j) {
        dp[i][j] = dp[i - 1][j] || 0;
      } else {
        dp[i][j] = (dp[i - 1][j] || 0) + (dp[i - 1][j - nums[i - 1]] || 0); 
        // 这种写法第一列，在nums[i] === 0 的时候初始化 就正常了
      }
    }
  }
  console.table(dp);
  return dp[nums.length][x];
};

// 最基础的二维数组方法 https://www.bilibili.com/video/BV1g34y1u7Eu
// ↓ done
// dp[i][j]定义为从nums[0] -> nums[i]中取数进行加减，得到j的方法 的数量
// dp[i][j] = dp[i-1][j-nums[i]] + dp[i-1][j+nums[i]];

// 初始化dp[i][j]
// 数组长度为 (nums的和) x 2 + 1

// 数组第一行 dp[0][-nums[i]] 和 dp[0][nums[i]]
/* var findTargetSumWays = function (nums, target) {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (Math.abs(target) > sum) {
    return 0;
  }

  const dpLen = sum * 2 + 1;
  const offset = sum;

  const dp = Array(nums.length)
    .fill(0)
    .map(() => Array(dpLen).fill(0));
  dp[0][offset - nums[0]] += 1; // 考虑会有第一行为0的情况，不用dp[0][offset - nums[0]] = 1 而用 +=
  dp[0][offset + nums[0]] += 1;
  // 即 如果是0 则初始化值为2

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < dpLen; j++) {
      if (j - nums[i] < 0) {
        dp[i][j] = dp[i - 1][j + nums[i]];
      } else if (j + nums[i] > dpLen - 1) {
        dp[i][j] = dp[i - 1][j - nums[i]];
      } else {
        dp[i][j] = dp[i - 1][j + nums[i]] + dp[i - 1][j - nums[i]];
      }
      // const topLeft =
      //   dp[i - 1][j + nums[i]] === undefined
      //     ? 0
      //     : dp[i - 1][j + nums[i]];
      // const topRight =
      //   dp[i - 1][j - nums[i]] === undefined
      //     ? 0
      //     : dp[i - 1][j - nums[i]];
      // dp[i][j] = topLeft + topRight;
    }
  }
  console.table(dp);
  return dp[nums.length - 1][offset + target];
}; */

const nums = [1,1,1,1,1];
const target = 3;
// const nums = [0, 0, 0, 0, 0, 0, 0, 0, 1];
// const target = 1;
const res = findTargetSumWays(nums, target);
console.log("res->", res);
