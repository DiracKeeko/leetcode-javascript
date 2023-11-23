/*
 * [215] 数组中的第K个最大元素
 */

/* 
  给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

  请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

  你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  // 快速排序的方式来解
  let left = 0,
    right = nums.length - 1;
  while (true) {
    const pos = partition(nums, left, right);
    if (pos === k - 1) return nums[pos];
    if (pos > k - 1) right = pos - 1;
    else left = pos + 1;
  }

  function partition(nums, left, right) {
    const pivot = nums[left];
    let l = left + 1,
      r = right;
    while (l <= r) {
      if (nums[l] < pivot && nums[r] > pivot) {
        [nums[l], nums[r]] = [nums[r], nums[l]];
        l++;
        r--;
      }
      if (nums[l] >= pivot) l++;
      if (nums[r] <= pivot) r--;
    }
    [nums[left], nums[r]] = [nums[r], nums[left]];
    return r;
  }
};

// 简单粗暴
var findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
};
