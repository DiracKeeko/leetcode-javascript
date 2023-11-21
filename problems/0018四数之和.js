/*
 * [18] 四数之和
 */

/* 
  给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

  0 <= a, b, c, d < n
  a、b、c 和 d 互不相同
  nums[a] + nums[b] + nums[c] + nums[d] == target
  你可以按 任意顺序 返回答案 。
*/

/* 
  输入：nums = [1,0,-1,0,-2,2], target = 0
  输出：[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

  输入：nums = [2,2,2,2,2], target = 8
  输出：[[2,2,2,2]]
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  const res = [];
  const temp = [];
  const size = nums.length;
  nums.sort((a, b) => a - b);
  dfs(0, 4, target);
  return res;

  function dfs(index, count, target) {
    if (count === 0 && target === 0) {
      res.push([...temp]);
      return;
    }

    if (size - index < count) {
      return;
    }
    if (target < count * nums[index]) {
      return;
    }
    if (target > count * nums[size - 1]) {
      return;
    }

    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i] === nums[i - 1]) {
        continue;
      }
      temp.push(nums[i]);
      dfs(i + 1, count - 1, target - nums[i]);
      temp.pop();
    }
  }
};

/* 
  我们不找forSum 我们找nSum

  用回溯的思想来解题，要剪枝，先排序
*/