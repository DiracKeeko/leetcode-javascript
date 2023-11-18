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

// v2 不考虑时间复杂度问题，用双指针来实现 O((m + n) / 2)
// 每次都向新数组尾部插入两个输入数组最小的值
var findMedianSortedArrays = function(nums1, nums2) {
  const arr = [];
  const [len1, len2] = [nums1.length, nums2.length];
  const mid = (len1 + len2) >> 1;
  let n1 = 0;
  let n2 = 0;
  while (n1 < len1 || n2 < len2) {
    if (n1 === len1) {
      arr.push(nums2[n2]);
      n2 += 1;
    } else if (n2 === len2) {
      arr.push(nums1[n1]);
      n1 += 1;
    } else {
      const min1 = nums1[n1];
      const min2 = nums2[n2];
      if (min1 < min2) {
        arr.push(min1);
        n1 += 1;
      } else {
        arr.push(min2);
        n2 += 1;
      }
    }

    if (arr.length > mid) {
      if ((len1 + len2) % 2 === 1) {
        return arr[mid];
      } else {
        return (arr[mid] + arr[mid - 1]) / 2;
      }
    }
  }
};
/* 
v2
2094/2094 cases passed (92 ms)
Your runtime beats 84.97 % of javascript submissions
Your memory usage beats 93.86 % of javascript submissions (44.9 MB)
*/