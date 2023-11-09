/*
 * [1143] 最长公共子序列
 */

/* 
  给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

  一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

  例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
  两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
*/

/*
示例 1：
  输入：text1 = "abcde", text2 = "ace" 
  输出：3  
  解释：最长公共子序列是 "ace" ，它的长度为 3 。


示例 2：
  输入：text1 = "abc", text2 = "abc"
  输出：3
  解释：最长公共子序列是 "abc" ，它的长度为 3 。
*/

/* 
1、dp[i][j] 表示text1中从[0, i - 1]任取字符串 与 text2中从[0, j - 1]任取字符串 所获得的最长公共子序列的长度

2、dp[i][j] 的递推公式
  if (text1[i - 1] === text2[j - 1]) {
    dp[i][j] = dp[i - 1][j - 1] + 1;
  } else {
    dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
  }

3、初始化 dp[0][j] 和 dp[i][0] 都取0

4、两层for循环，text1和text2的先后关系无所谓。
*/

/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  const [l1, l2] = [text1.length, text2.length];
  const dp = [Array(l2 + 1).fill(0)];

  for (let i = 1; i <= l1; i++) {
    dp[i] = [0];
    for (let j = 1; j <= l2; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  console.table(dp);
  return dp[l1][l2];
};


// ↓ 这种赋值方式 比上面一种赋值方式执行的效率要搞
/* 
47/47 cases passed (104 ms)
Your runtime beats 91.08 % of javascript submissions
Your memory usage beats 94.97 % of javascript submissions (62.1 MB)
*/
var longestCommonSubsequence = function (text1, text2) {
  const [l1, l2] = [text1.length, text2.length];
  const dp = [];

  for (let i = 0; i <= l1; i++) {
    dp[i] = [];
    for (let j = 0; j <= l2; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[l1][l2];
};

const text1 = "abcde",
  text2 = "ace";
const res = longestCommonSubsequence(text1, text2);
console.log("res->", res);