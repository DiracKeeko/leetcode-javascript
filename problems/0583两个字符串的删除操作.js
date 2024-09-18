/*
 * [583] 两个字符串的删除操作
 */

/* 
  给定两个单词 word1 和 word2 ，返回使得 word1 和  word2 相同所需的最小步数。

  每步 可以删除任意一个字符串中的一个字符。
*/

/* 
输入: word1 = "sea", word2 = "eat"
输出: 2
解释: 第一步将 "sea" 变为 "ea" ，第二步将 "eat "变为 "ea"
*/

/* 
dp五步
1. 确定dp数组（dp table）以及下标的含义
  dp[i][j] 以i-1为结尾的字符串word1，和以j-1位结尾的字符串word2，想要达到相等，所需要删除元素的最少次数。

2. 确定递推公式
  if (word1[i - 1] === word2[j - 1]) {
    dp[i][j] = dp[i - 1][j - 1];
  } else {
    dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + 2);
  }

3. dp数组如何初始化
  dp[0][j] = j; dp[i][0] = i;

4. 确定遍历顺序
5. 举例推导dp数组

*/
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */

var minDistance = function (word1, word2) {
  const [l1, l2] = [word1.length, word2.length];
  // const dp = [
  //   Array(l2 + 1)
  //     .fill(0)
  //     .map((item, index) => index),
  // ];
  // 上下等价
  const dp = [Array.from({ length: l2 + 1 }, (v, i) => i)];

  for (let i = 1; i <= l1; i++) {
    dp[i] = [i];
    for (let j = 1; j <= l2; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 2
        );
      }
    }
  }
  console.table(dp);
  return dp[l1][l2];
};

// v2 先找最长公共子序列的长度，再求出到达公共最长子序列需要的步骤
var minDistance = function (word1, word2) {
  return word1.length + word2.length - 2 * lcs(word1, word2);

  function lcs(arr1, arr2) {
    const [l1, l2] = [arr1.length, arr2.length];
    const dp = [Array(l2 + 1).fill(0)];
    for (let i = 1; i <= l1; i++) {
      dp[i] = [0];
      for (let j = 1; j <= l2; j++) {
        if (arr1[i - 1] === arr2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
        }
      }
    }
    return dp[l1][l2];
  }
};

const w1 = "a",
  w2 = "b";
const res = minDistance(w1, w2);
console.log("res->", res);
