/*
 * [45] 跳跃游戏 II
 */

/* 
  给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。

  每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:

  0 <= j <= nums[i] 
  i + j < n
  返回到达 nums[n - 1] 的最小跳跃次数。生成的测试用例可以到达 nums[n - 1]。
  
*/

/* 
  输入: nums = [2,3,1,1,4]
  输出: 2
  解释: 跳到最后一个位置的最小跳跃数是 2。
     从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 每一步尽可能多的增加覆盖范围
var jump = function(nums) {
  if (nums.length === 1) {
    return 0;
  }
  let max = 0;
  let cover = 0;
  let count = 0;

  for (let i = 0; i <= cover; i++) {
    max = Math.max(max, i + nums[i]);
    // console.log({max});
    if (max >= nums.length - 1) {
      return count + 1;
    }
    if (i === cover) {
      cover = max;
      count += 1;
      // console.log({i, cover, count});
    }
  }
};


let test = [2,3,1,1,4];
const res = jump(test);
console.log("res->", res);