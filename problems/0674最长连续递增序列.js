/*
 * [674] 最长连续递增序列
 */

/* 
  给定一个未经排序的整数数组，找到最长且 连续递增的子序列，并返回该序列的长度。

  连续递增的子序列 可以由两个下标 l 和 r（l < r）确定，如果对于每个 l <= i < r，都有 nums[i] < nums[i + 1] ，那么子序列 [nums[l], nums[l + 1], ..., nums[r - 1], nums[r]] 就是连续递增子序列。
*/

/* 
1、dp table的含义
  dp[i] 表示以nums[i]结尾的，最长且连续递增的子序列的长度
2、递推公式
  if (nums[i] > nums[i - 1]) {
    dp[i] = dp[i - 1] + 1;
  }
  
3、初始化
  全部初始化为1
4、遍历顺序
  一层for循环 从i=1开始
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function(nums) {
  const dp = Array(nums.length).fill(1); // const len = nums.length;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      dp[i] = dp[i - 1] + 1;
    }
  }

  return Math.max(...dp);
};