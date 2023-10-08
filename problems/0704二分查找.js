/*
 * [704] 二分查找
 */

/* 
  给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const guess = (left + right) >> 1;
    const curNum = nums[guess];
    if (curNum === target) {
      return guess;
    } else if (curNum < target) {
      left = guess + 1;
    } else {
      right = guess - 1;
    }
  }
  return -1;
};