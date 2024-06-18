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

// 解析见：
// https://programmercarl.com/0045.%E8%B7%B3%E8%B7%83%E6%B8%B8%E6%88%8FII.html#思路

// 每一步尽可能多的增加覆盖范围
// v1
var jump = function(nums) {
  if (nums.length === 1) {
    return 0;
  }
  let curCover = 0; // 记录当前可覆盖的范围
  let nextCover = 0; // 记录下一跳可覆盖的范围
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i + nums[i] > nextCover) {
      nextCover = i + nums[i];
    }
    if (i === curCover) { // i 移动到curCover的时候就应该跳一次了
      count += 1;
      curCover = nextCover;
      if (nextCover >= nums.length - 1) {
        break;
      }
    }
  }
  return count;
};

// v2 代码随想录的解法二 没get到 这里不写了

let test = [2,3,1,1,4];
const res = jump(test);
console.log("res->", res);