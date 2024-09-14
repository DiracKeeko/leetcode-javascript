/*
 * [392] 判断子序列
 */

/* 
  给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

  字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
*/

/* 
1、dp[i][j] 表示s中截取[0, i - 1]字符串 是否是 t中从[0, j - 1]任取字符串 的子序列

2、dp[i][j] 的递推公式
  if (s[i - 1] === t[j - 1]) {
    dp[i][j] = dp[i - 1][j - 1] && true;
  } else {
    dp[i][j] = dp[i][j - 1]; // 这里与1143题不同, 只能从一个方向取 
    // (即 只能取 s的[0, i] 与 t的[0, j - 1]的结果)
  }

3、初始化
  dp[0][j]都取true,  i>0 dp[i][0] 都取false

4、两层for循环，外层循环s 内层循环t  (可以调换顺序)
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  const [sl, tl] = [s.length, t.length];
  const dp = [Array(tl + 1).fill(true)];

  for (let i = 1; i <= sl; i++) {
    dp[i] = [false]; // 注意这个初始化逻辑
    for (let j = 1; j <= tl; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // dp[i][j] = dp[i - 1][j - 1] && true;
      } else {
        dp[i][j] = dp[i][j - 1]; // 只能取 s的[0, i] 与 t的[0, j - 1]的结果
      }
    }
  }
  console.table(dp);
  return dp[sl][tl];
};

// 有一个小小的 完成判断的优化，但是执行效率还不如上面的版本
var isSubsequence = function (s, t) {
  const [sl, tl] = [s.length, t.length];
  if (sl === 0) {
    return true;
  }
  const dp = [Array(tl + 1).fill(true)];

  for (let i = 1; i <= sl; i++) {
    dp[i] = [false];
    for (let j = 1; j <= tl; j++) {
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = dp[i][j - 1];
      }

      if (i === sl && dp[i][j] === true) {
        return true;
      }
    }
  }
  return false;
};

const s = "abc",
  t = "ahbgdc";
const res = isSubsequence(s, t);
console.log("res->", res);
