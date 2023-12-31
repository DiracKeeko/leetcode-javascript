/**
 * [15] 三数之和
  给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
  你返回所有和为 0 且不重复的三元组。

  注意：答案中不可以包含重复的三元组。
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var threeSum = function (nums) {
  if (nums.length < 3) {
    return [];
  }
  // 先排序
  nums.sort((a, b) => a - b); // a - b从小到大排序
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    const curNum = nums[i];
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      if (curNum + nums[left] + nums[right] === 0) {
        res.push([curNum, nums[left], nums[right]]); // 先放入
        while (nums[left] === nums[left + 1]) {
          // ↑ 判断下一步，去重
          left++;
        }
        while (nums[right] === nums[right - 1]) {
          right--;
        }
        left++;
        right--;
      } else if (curNum + nums[left] + nums[right] > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  return res;
};
