/* 
给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
*/

/* 
示例 1：

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
示例 2：

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
示例 3：

输入：nums = [], target = 0
输出：[-1,-1]

*/

// 看到 时间复杂度为 O(log n) 想到二分

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
  const leftIndex = searchLeft(nums, target);
  const rightIndex = searchRight(nums, target);
  return [leftIndex, rightIndex];
};
function searchLeft(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target && nums[mid - 1] !== target) {
      return mid;
    }

    if (nums[left] <= target && target <= nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}
function searchRight(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target && nums[mid + 1] !== target) {
      return mid;
    }

    if (nums[mid] <= target && target <= nums[right]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

/* 
Accepted
88/88 cases passed (0 ms)
Your runtime beats 100 % of javascript submissions
Your memory usage beats 59.61 % of javascript submissions (55.1 MB)
耗时 0:3:30
*/