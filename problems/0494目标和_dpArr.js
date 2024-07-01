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
  1. 确定dp数组（dp arr）以及下标的含义
    一维数组dp[j] 在[0, i]之间任选物品，装满容量为j的背包有dp[j]种方案。

  2. 确定递推公式
    dp[j] = j > nums[i] ? dp[j] + dp[j - nums[i]] : dp[j];

    如果 j > nums[i], dp[j] = 不放数字nums[i]的方案数(等于原来的(上一次循环后的)dp[j] + dp[j - nums[i]]的方案数
    如果 j <= nums[i], dp[j] = 不放数字nums[i]的方案数(等于原来的(上一次循环后的)dp[j]

    如果按照3.2的初始化方案，递推公式变为
    dp[i][j] = dp[i-1][j] + dp[i-1][j-nums[i]]

  3. dp数组如何初始化
    nums = [1, 2, 1, 4]; target = 2

    size = (sum + target) >> 1 = (8 + 2) >> 1 = 5;


    dp[j] = [1, 0, 0, 0, 0, 0];
    
  4. 确定遍历顺序
    两层for循环，先循环物品i 再循环背包容量j
    i都是从小到大, j从大到小(j必须从大到小，否则在单层循环中有重复的nums[i])

    i从0开始，j从size开始, j到nums[i]结束

  5. 举例推导dp数组
    nums = [1, 2, 1, 4], target = 2;
    => sum = 8; x = (target + sum) / 2 = 5

    i = 0; dp = [1, 1, 0, 0, 0, 0];
    i = 1; dp = [1, 1, 1, 1, 0, 0];
    i = 2; dp = [1, 2, 2, 2, 1, 0];
    i = 3; dp = [1, 2, 3, 3, 2, 2];
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// 正数和 => 一维dp数组解法
var findTargetSumWays = function(nums, target) {
  const sum = nums.reduce((acc, cur) => acc + cur, 0);
  if (Math.abs(target) > sum) {
    return 0;
  }
  if ((sum + target) % 2 === 1) {
    return 0;
  }

  const size = (sum + target) >> 1;
  const dp = Array(size + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < nums.length; i++) {
    for (let j = size; j >= nums[i]; j--) {
        dp[j] = dp[j] + dp[j - nums[i]];
    }
  }
  return dp[size];
};

const nums = [1,1,1,1,1];
const target = 3;
// const nums = [0, 0, 0, 0, 0, 0, 0, 0, 1];
// const target = 1;
const res = findTargetSumWays(nums, target);
console.log("res->", res);
