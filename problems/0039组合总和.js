/*
 * [39] 组合总和
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
    if (sum > target) {
      return;
    }
    if (sum === target) {
      res.push([...path]);
      return;
    }

    for (let i = curIndex; i < candidates.length; i++) {
      let num = candidates[i];
      if (num + sum > target) {
        break;
      }
      path.push(num);
      sum += num;
      backtrack(sum, i);
      path.pop();
      sum -= num;
    }
  }
};