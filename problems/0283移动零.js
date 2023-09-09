/*
 * [283] 移动零
 */
/* 
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。
*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let i = 0;
  for (let j = 0; j < nums.length; j++) {
    if (nums[j] === 0) {
      continue;
    } else {
      const temp = nums[i];
      nums[i] = nums[j];
      nums[j] = temp; // 这一行不能用 nums[j] = 0; 否则输入为[1]的情况不能通过
      i += 1;
    }
  }
};