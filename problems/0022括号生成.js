/*
 * [21] 括号生成
 *  数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 */

/**
  输入：n = 3
    输出：["((()))","(()())","(())()","()(())","()()()"]
 
  输入：n = 1
    输出：["()"]
 */

/**
 * @param {n} 
 * @return {string}
 */
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  const res = [];
  const path = [];
  backTrack(0, 0);
  return res;

  function backTrack(leftCount, rightCount) {
    if (leftCount === n && rightCount === n) {
      res.push(path.join(""));
      return;
    }

    if (leftCount < n) {
      path.push("(");
      backTrack(leftCount + 1, rightCount);
      path.pop();
    }
    if (rightCount < leftCount) {
      path.push(")");
      backTrack(leftCount, rightCount + 1);
      path.pop();
    }
  }
};

/* 
Accepted
8/8 cases passed (3 ms)
Your runtime beats 36.44 % of javascript submissions
Your memory usage beats 52.7 % of javascript submissions (54.6 MB)
耗时 2:50:28
*/