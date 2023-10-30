/*
 * [416] 分割等和子集
 */

/* 
  给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
*/

/* 
  输入：nums = [1,5,11,5]
  输出：true
  解释：数组可以分割成 [1, 5, 5] 和 [11] 。

  输入：nums = [1,2,3,5]
  输出：false
  解释：数组不能分割成两个元素和相等的子集。
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  const sum = nums.reduce((acc, cur) => acc + cur, 0);
  if (sum % 2 === 1) {
    return false;
  }
  const target = sum / 2;
  
  // 往后就可以抽象为01背包问题，nums = weight = value
  // 如果dp[target] === target 就返回true

  /* 
    dp五步
    1. 确定dp数组（dp table）以及下标的含义
      dp[j] 表示容量为j的背包能装的最大价值

    2. 确定递推公式
      用滚动数组来解
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);

    3. dp数组如何初始化
      默认填充0

    4. 确定遍历顺序
      两层for循环，第一层遍历物品，第二层遍历容量，遍历容量时从大到小。

    5. 举例推导dp数组
  */

  const dp = new Array(target + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    for (let j = target; j >= nums[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - nums[i]] + nums[i]);
    }
  }

  console.log({dp});
  return dp[target] === target;
};

const nums = [1,5,11,5];
const res = canPartition(nums);
console.log("res->", res);