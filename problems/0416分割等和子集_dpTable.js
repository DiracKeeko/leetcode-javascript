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
  const target = sum >> 1;
  
  // 往后就可以抽象为01背包问题，nums = weight = value
  // 如果dp[target] === target 就返回true

  /* 
    dp五步
    1. 确定dp数组（dp table）以及下标的含义
      dp[i][j] 表示从下标为nums数组的0-i下标中任取数字, 装入容量为j的背包能装的最大价值
      其中 nums[i] 既是占据空间，也是价值

    2. 确定递推公式
      用二维dp数组来解
      dp[i][j] = Math.max(dp[i-1][j], dp[j - nums[i - i]] + nums[i - 1]);

    3. dp数组如何初始化
      全部填充0，并将第一行特殊初始化，放入nums[0]的放入nums[0]

    4. 确定遍历顺序
      两层for循环，第一层遍历物品，第二层遍历容量，遍历容量时从小到大。

    5. 举例推导dp数组
  */

  const dp = Array(len).fill(0).map(() => Array(target + 1).fill(0));
  for (let j = nums[0]; j <= target; j++) {
    dp[0][j] = nums[0];
  }

  for (let i = 1; i < len; i++) {
    for (let j = 1; j <= target; j++) {
      if (nums[i] > j) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - nums[i]] + nums[i])
      }
    }
  }
  console.table(dp);
  return dp[len - 1][target] === target;
};

const nums = [1,5,11,5];
const res = canPartition(nums);
console.log("res->", res);