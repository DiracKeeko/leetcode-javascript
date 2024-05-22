/*
 * [40] 组合总和 II
 */

/* 
  给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

  candidates 中的每个数字在每个组合中只能使用 一次 。

  注意：解集不能包含重复的组合。 
 */

/* 
  输入: candidates = [2,5,2,1,2], target = 5,
  输出:
  [
    [1,2,2],
    [5]
  ]

  输入: candidates = [10,1,2,7,6,1,5], target = 8,
  输出:
  [
    [1,1,6],
    [1,2,5],
    [1,7],
    [2,6]
  ]
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  candidates.sort((a, b) => a - b);
  const path = [];
  const res = [];
  backtrack(0, 0, []);
  return res;

  function backtrack(sum, startIndex, usedArr) {
    if (sum === target) {
      res.push([...path]);
      return;
    }

    // 这个是组合，所以对树枝来说，不回头，只能向后找，因此开始于startIndex
    for (let i = startIndex; i < candidates.length; i++) {
      if (candidates[i] === candidates[i - 1] && !usedArr[i - 1]) {
        continue;
      }

      if (!usedArr[i]) {
        const curNum = candidates[i];
        if (curNum + sum > target) {
          break;
        }

        usedArr[i] = true;
        path.push(candidates[i]);
        backtrack(curNum + sum, i, usedArr);
        usedArr[i] = false;
        path.pop();
      }
    }
  }
};

// 更精简的实现
var combinationSum2 = function(candidates, target) {
  candidates.sort((a, b) => a - b);
  const res = [];
  const path = [];
  backtrack(0);
  return res;

  function backtrack(index) {
    const sum = path.reduce((a, b) => a + b, 0);
    if (sum === target) {
      res.push([...path]);
      return;
    }

    if (sum > target) {
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      if (i === index || candidates[i] !== candidates[i - 1]) {
        path.push(candidates[i]);
        backtrack(i + 1);
        path.pop();
      }
    }
  }
};

const candidates = [1, 2, 2, 2, 5];
const target = 5
res = combinationSum2(candidates, target);
console.log({res});
