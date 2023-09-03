/* 
[300] 最长递增子序列

给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  // dp[i] 代表nums[i]之前的数组, 最长递增子序列的长度
  const length = nums.length;
  if (length === 0) {
    return 0;
  }
  const dp = new Array(length).fill(1);
  for (let i = 0; i < nums.length; i++) {
    const target = nums[i];
    for (let j = 0; j < i; j++) {
      const temp = nums[j];
      if (target > temp) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
};