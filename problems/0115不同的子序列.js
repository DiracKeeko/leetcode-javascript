/*
 * [115] 不同的子序列
 */

/* 
  给你两个字符串 s 和 t ，统计并返回在 s 的 子序列 中 t 出现的个数，结果需要对 109 + 7 取模。
*/

/* 
dp五步
1. 确定dp数组（dp table）以及下标的含义
  dp[i][j] 表示从t中截取[0, i-1]的字符串ti, s中[0, j-1]中以j-1结尾的部分包含的ti的个数

2. 确定递推公式
  if (t[i - 1] === s[j - 1]) {
    dp[i][j] = dp[i - 1][j - 1] + dp[i][j - 1];
  } else {
    dp[i][j] = dp[i][j - 1];
  }

  当t[i - 1]与s[j - 1]相等时，dp[i][j]可以有两部分组成。
    一部分是将t[i - 1]作为最后一个字母，那么个数为dp[i - 1][j - 1]。
    一部分是不用t[i - 1]作为最后一个字母，个数为dp[i - 1][j]。

3. dp数组如何初始化
  dp[0][j] = 1;
  i > 0, dp[i][0] 赋值为0

4. 确定遍历顺序
  两层for循环，先i后j, i和j都从1开始

5. 举例推导dp数组
  s = "babgbag", t = "bag"
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 2, 2, 3, 3, 3],
    [0, 0, 1, 1, 1, 1, 4, 4],
    [0, 0, 0, 0, 1, 1, 1, 5]
  ]

*/
/*  */
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
  const [tl, sl] = [t.length, s.length];
  const dp = [Array(s.length + 1).fill(1)];
  for (let i = 1; i <= tl; i++) {
    dp[i] = [0];
    for (let j = 1; j <= sl; j++) {
      if (t[i - 1] === s[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i][j - 1];
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
  // console.table(dp);
  
  return dp[tl][sl];
};

// const s = "babgbag", t = "bag";
const s = "rabbbit", t = "rabbit";
const res = numDistinct(s, t);
console.log(res);
