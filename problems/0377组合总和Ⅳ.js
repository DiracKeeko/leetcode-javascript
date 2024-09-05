/*
 * [377] 组合总和 Ⅳ
 */

/* 
  给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数。

  题目数据保证答案符合 32 位整数范围。
*/

/* 
1. 确定dp数组（dp table）以及下标的含义
  dp[j] 从[0, i]之间任取nums[i], 放入容量为j的背包, 可以装满j容量背包的排列总数为dp[j]
2. 确定递推公式
  dp[j] = dp[j] + dp[j - nums[i]]

3. dp数组如何初始化
  dp[0] = 1

4. 确定遍历顺序
  对一维dp数组的解法
    两层for循环，先循环容量，再循环物品 (顺序不可以颠倒)

    如果把遍历nums（物品）放在外循环，遍历target的作为内循环的话，
    举一个例子：计算dp[4]的时候，结果集只有 {1,3} 这样的集合，不会有{3,1}这样的集合，因为nums遍历放在外层，3只能出现在1后面。

    所以本题遍历顺序最终遍历顺序：target（背包）放在外循环，将nums（物品）放在内循环，内循环从前到后遍历。

5. 举例推导dp数组

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function(nums, target) {
  const dp = Array(target + 1).fill(0);
  dp[0] = 1;

  for (let j = 1; j <= target; j++) {
    for (let i = 0; i < nums.length; i++) {
      if (j >= nums[i]) {
        dp[j] = dp[j] + dp[j - nums[i]];
      }
    }
  }
  console.log(dp);
  return dp[target];
};

const nums = [1,2,3], target = 4;
const res = combinationSum4(nums, target);
