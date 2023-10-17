/*
 * [90] 子集 II
 */

/* 
  给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

  解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。

  输入：nums = [1,2,2]
  输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
  nums.sort((a, b) => a - b);

  const path = [];
  const res = [];
  backtrack(0, []);
  return res;

  function backtrack(startIndex, used) {
    res.push([...path]);

    if (startIndex === nums.length) {
      return;
    }

    for (let i = startIndex; i < nums.length; i++) {
      if (nums[i] === nums[i - 1] && !used[i - 1]) {
        continue;
      }

      if (!used[i]) {
        used[i] = true;
        path.push(nums[i]);
        backtrack(i + 1, used);
        used[i] = false;
        path.pop();
      }
    }
  }
};

const test = [1, 2, 2];
const res = subsetsWithDup(test);
console.log({res});