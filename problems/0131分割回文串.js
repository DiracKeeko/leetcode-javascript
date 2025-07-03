/*
 * [131] 分割回文串
 */

/* 
  给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。

  回文串 是正着读和反着读都一样的字符串。
*/

/* 
  输入：s = "aab"
  输出：[["a","a","b"],["aa","b"]]

  输入：s = "a"
  输出：[["a"]]
*/

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const length = s.length;
  const res = [];
  const path = [];
  backtrack(0);
  return res;

  function backtrack(startIndex) {
    if (startIndex === length) {
      res.push([...path]);
      return;
    }
    for (let i = startIndex + 1; i <= length; i++) {
      const sliceStr = s.slice(startIndex, i);
      if (isPalindrome(sliceStr)) {
        path.push(sliceStr)
        backtrack(i);
        path.pop();
      } 
      // 这里不能 else { return; }
      // 对"aba"这种情况, "ab"不是回文, 但"aba"是回文
    }
  }
};

function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  while (left <= right) {
    if (str[left++] !== str[right--]) {
      return false;
    }
  }
  return true;
}
const res = partition("aab");
console.log({ res });
