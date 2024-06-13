/*
 * [1005] K 次取反后最大化的数组和
 */

/* 
  给你一个整数数组 nums 和一个整数 k ，按以下方法修改该数组：

  选择某个下标 i 并将 nums[i] 替换为 -nums[i] 。
  重复这个过程恰好 k 次。可以多次选择同一个下标 i 。

  以这种方式修改数组后，返回数组 可能的最大和 。
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumAfterKNegations = function(nums, k) {
  nums.sort((a, b) => a - b);
  let i = 0;
  let count = 0
  while (count < k) {
    if (nums[i] < 0) {
      nums[i] = -nums[i];
      i += 1;
      i = Math.min(i, nums.length - 1); // 如果i>nums.length - 1, 那么就让它变成nums.length;
      count += 1;
    } else if (nums[i] === 0) {
      break;
    } else if (nums[i] > 0) {
      let pre = nums[i - 1];
      let cur = nums[i];
      // if (pre < cur) {
      //   i -= 1;
      //   count += 1;
      //   nums[i] = -nums[i]; // 变为负值
      // } else {
      //   count += 1;
      //   nums[i] = -nums[i];
      // }
      if (pre < cur) {
        i -= 1;
      }
      count += 1;
      nums[i] = -nums[i];
    }
  }

  return nums.reduce((acc, cur) => acc + cur, 0);
};

// v2
var largestSumAfterKNegations = function(nums, k) {
  nums.sort((a, b) => a - b);
  let i = 0;
  while (k) {
    if (nums[i] < 0) {
      nums[i] = -nums[i];
      i += 1;
      i = i >= nums.length ? nums.length - 1 : i; // 换用这种 i = Math.min(i, nums.length - 1);
    } else if (nums[i] === 0) {
      break;
    } else {
      if (nums[i] > nums[i - 1]) {
        nums[i - 1] = -nums[i - 1];
        i -= 1;
      } else {
        nums[i] = -nums[i];
      }
    }
    k -= 1;
  }
  return nums.reduce((acc, cur) => acc + cur, 0);
};