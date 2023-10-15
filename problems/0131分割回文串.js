/*
 * [131] 分割回文串
 */

/* 
  给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。

  回文串 是正着读和反着读都一样的字符串。
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
      const slice = s.slice(startIndex, i);
      if (isPalindrome(slice)) {
        path.push(slice)
        backtrack(i);
        path.pop();
      }
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
