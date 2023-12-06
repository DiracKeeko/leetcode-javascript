/*
 * [217] 存在重复元素
 */

/* 
  给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */

// v1
var containsDuplicate = function(nums) {
  const obj = {};
  for (const item of nums) {
    obj[item] = obj[item] || 0;
    obj[item] += 1;
  }
  const valueArr = Object.values(obj);
  return valueArr.some(frequency => frequency >= 2);
};
/* 
v1
Accepted
75/75 cases passed (164 ms)
Your runtime beats 18.49 % of javascript submissions
Your memory usage beats 10.29 % of javascript submissions (57.6 MB)
*/

// v2
var containsDuplicate = function(nums) {
  const map = new Map();
  for (const item of nums) {
    if (map.has(item)) {
      return true;
    }
    map.set(item, 1);
  }
  return false;
};
/* 
v2
75/75 cases passed (80 ms)
Your runtime beats 92.17 % of javascript submissions
Your memory usage beats 6.24 % of javascript submissions (57.6 MB)
*/

// v3
var containsDuplicate = function(nums) {
  return new Set(nums).size !== nums.length;
};
/* 
v3
75/75 cases passed (84 ms)
Your runtime beats 83.4 % of javascript submissions
Your memory usage beats 57.65 % of javascript submissions (53.6 MB)
*/

