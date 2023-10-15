/*
 * [125] 验证回文串
 */

/* 
  如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
*/
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  const str = s.replace(/[^a-z0-9]/gi, "").toLowerCase();
  let left = 0;
  let right = str.length - 1;
  while (left <= right) {
    if (str[left++] !== str[right--]) {
      return false;
    }
  }
  return true;
};