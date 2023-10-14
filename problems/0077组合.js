/*
 * [77] 组合
 */

/* 
  给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。

  你可以按 任何顺序 返回答案。
*/

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  const res = [];
  const path = [];
  backtrack(1);
  return res;

  function backtrack(startNum) {
    console.log("startNum->", startNum);
    console.log({path});
    if (path.length === k) {
      res.push([...path]);
      return;
    }

    for (let i = startNum; i <= n; i++) {
      path.push(i);
      backtrack(i + 1);
      path.pop();
    }
  }
};

let res = combine(4, 2);
console.log({res});

