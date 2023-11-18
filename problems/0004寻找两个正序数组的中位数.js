/*
 * [4] 寻找两个正序数组的中位数
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

// v1 不考虑时间复杂度问题，用数组排序来实现 O(m + n)
var findMedianSortedArrays = function(nums1, nums2) {
  const arr = nums1.concat(nums2);
  arr.sort((a, b) => a - b);
  const size = arr.length;

  const mid = size >> 1;
  if (size % 2 === 1) {
    return arr[mid];
  } else {
    return (arr[mid] + arr[mid - 1]) / 2;
  }
};
