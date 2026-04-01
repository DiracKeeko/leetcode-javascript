/* 
给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。
*/

/* 
示例 1：
输入：nums = [3,2,3]
输出：3

示例 2：
输入：nums = [2,2,1,1,1,2,2]
输出：2
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
// v1
var majorityElement = function(nums) {
  nums.sort((a, b) => a - b);
  const len = nums.length;
  const midIndex = len >> 1
  return nums[midIndex];
};

/* 
v1
Accepted
53/53 cases passed (2 ms)
Your runtime beats 86.64 % of javascript submissions
Your memory usage beats 27.99 % of javascript submissions (58 MB)
耗时 0:1:13
*/


// v2 候选人解法
var majorityElement = function(nums) {
  let candidate = null;
  let count = 0;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }

    if (candidate === num) {
      count += 1;
    } else {
      count -= 1;
    }
  }
  return candidate;
};

/* 
v2
Accepted
53/53 cases passed (2 ms)
Your runtime beats 86.64 % of javascript submissions
Your memory usage beats 69.52 % of javascript submissions (56.6 MB)
 */