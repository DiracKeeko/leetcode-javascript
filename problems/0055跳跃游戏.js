/* 
0055跳跃游戏

给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 true ；
否则，返回 false 。
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
  let maxReach = 0;
  const target = nums.length - 1;

  for (let i = 0; i <= maxReach; i++) {
    if (maxReach >= target) {
      return true;
    }
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return false;
};

/* 
Accepted
178/178 cases passed (0 ms)
Your runtime beats 100 % of javascript submissions
Your memory usage beats 28.68 % of javascript submissions (59.3 MB)
*/