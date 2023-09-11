/*
 * [209] 长度最小的子数组
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */

/* 
给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其总和大于等于 target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
*/

// 暴力解
var minSubArrayLen = function(target, nums) {
  let minSubLen = Infinity;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) {
        const len = j - i + 1;
        minSubLen = Math.min(minSubLen, len);
      }
    }
  }
  return minSubLen > nums.length ? 0 : minSubLen;
};

// 双指针 找个范围 j所在的位置nums[j]没有加上, (j可以等于arr.length) i所在的位置nums[i]没有减掉
var minSubArrayLen1 = function(target, nums) {
  let minSubLen = Infinity;
  let i = 0;
  let j = 0;
  let sub = 0;
  while (j <= nums.length) {
    // console.log("params->", {i, j, sub, minSubLen});
    if (sub >= target) {
      let subLen = j - i;
      minSubLen = Math.min(minSubLen, subLen);
      sub -= nums[i];
      i += 1;
    } else {
      sub += nums[j];
      j += 1;
    }
    // console.log("params1---->", {i, j, sub, minSubLen});
  }
  return minSubLen > nums.length ? 0 : minSubLen;
};

const target = 7;
const inputArr = [2,3,1,2,4,3];
const res = minSubArrayLen1(target, inputArr);
console.log("res->", res);