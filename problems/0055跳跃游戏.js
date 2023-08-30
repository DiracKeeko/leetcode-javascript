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
  let cover = 0;
  for (let i = 0; i <= cover; i++) {
    let curPoint = nums[i] + i;
    if (curPoint >= nums.length - 1) {
      return true;
    }
    cover = Math.max(curPoint, cover);
  }
  return false;
};