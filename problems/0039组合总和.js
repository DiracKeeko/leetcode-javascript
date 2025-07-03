/*
 * [39] 组合总和
 */

/* 
  给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

  candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 

  对于给定的输入，保证和为 target 的不同组合数少于 150 个。
*/

/* 
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]

输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]

输入: candidates = [2], target = 1
输出: []
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  const res = [];
  let path = [];
  candidates.sort((a, b) => a - b); // 先排序，后面就可以直接break了。
  backtrack(0, 0);
  return res;

  function backtrack(sum, curIndex) {
    if (sum === target) {
      res.push([...path]); // 一定要解构，相当于深拷贝
      return;
    }

    // ↓ 先排序，再往后找，别回头，所以i从curIndex开始
    for (let i = curIndex; i < candidates.length; i++) {
      let num = candidates[i];
      if (num + sum > target) {
        // break;
        return; // 效率更高
      }
      path.push(num);
      sum += num;
      backtrack(sum, i);
      path.pop();
      sum -= num;
    }
  }
};