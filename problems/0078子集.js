/*
 * [78] 子集
 */

/* 
  给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

  解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
*/
/* 
  输入：nums = [1,2,3]
  输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

  输入：nums = [0]
  输出：[[],[0]]
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const res = [];
  const path = [];
  backtrack(0);
  return res;

  function backtrack(startIndex) {
    res.push([...path]);
    for (let i = startIndex; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }
};