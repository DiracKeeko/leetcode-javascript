/*
 * [516] 最长回文子序列
 */

/* 
dp五步
1. 确定dp数组（dp table）以及下标的含义
  dp[i][j] 表示字符串s 在[i, j]区间(含i, 含j) 所包含的最大回文子序列的长度

2. 确定递推公式
  if (s[i] === s[j]) {
    dp[i][j] = dp[i + 1][j - 1] + 2;
  } else {
    dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
  }

3. dp数组如何初始化
  dp[i][j] = 0
  dp[i][j] = 1 (i === j) => dp[i][i] = 1

4. 确定遍历顺序
  两层for循环  i从大到小，j从小到大

5. 举例推导dp数组
*/

/**
 * @param {string} s
 * @return {number}
 */
// v1
var longestPalindromeSubseq = function(s) {
  const l = s.length;
  const dp = Array(l).fill(0).map(() => Array(l).fill(0));

  for (let i = 0; i < l; i++) {
    dp[i][i] = 1;
  }

  for (let i = l - 1; i >= 0; i--) {
    for (let j = i + 1; j < l; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j]);
      }
    }
  }
  // console.table(dp);
  return dp[0][l - 1];
};

// v2 优化代码
var longestPalindromeSubseq = function(s) {
  const len = s.length;
  const dp = Array(len).fill(0).map(() => Array(len).fill(0));

  for (let i = len - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < len; j++) {
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][len - 1];
};

const s = "bbbab";
const res = longestPalindromeSubseq(s);
console.log("res->", res);

/* 
  总结：
    与0647回文子串类似，有效半区仅在右上半区，左上半区不做统计。
*/