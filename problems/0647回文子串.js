/*
 * [647] 回文子串
 */

/* 
  给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。

  回文字符串 是正着读和倒过来读一样的字符串。

  子字符串 是字符串中的由连续字符组成的一个序列。

  具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
*/

/* 
示例 1：
  输入：s = "abc"
  输出：3
  解释：三个回文子串: "a", "b", "c"

示例 2：
  输入：s = "aaa"
  输出：6
  解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
*/

/* 
dp五步
1. 确定dp数组（dp table）以及下标的含义
  dp[i][j] 表示字符串s [i, j]之间(包含i, j)的部分是否是回文串

2. 确定递推公式
  当s[i] === s[j]的时候
  if (s[i] === s[j]) {
    if (j - i >= 1) {
      dp[i][j] = true;
    } else {
      dp[i][j] = dp[i + 1][j - 1];
    }
  } else {
    break;
  }

3. dp数组如何初始化
  dp[i][j]全部初始化为false

4. 确定遍历顺序
  两层for循环i从大到小, j从小到大

5. 举例推导dp数组
*/

/**
 * @param {string} s
 * @return {number}
 */

// v1
var countSubstrings = function(s) {
  const l = s.length;
  const dp = Array(l).fill(0).map(() => (Array(l).fill(false))); // ## 全量初始化逻辑
  let res = 0;
  
  for (let i = l - 1; i >= 0; i--) {
    for (let j = i; j < l; j++) {
      // console.log({i, j});
      if (s[i] === s[j]) {
        if (j - i <= 1) {
          dp[i][j] = true;
          res += 1;
        } else if (dp[i + 1][j - 1]) { // 这里也可以学习
          dp[i][j] = true;
          res += 1;
        }
      }
    }
  }

  console.table(dp);
  return res;
};

// v2
var countSubstrings = function(s) {
  const len = s.length;
  const dp = [];
  let res = 0;

  for (let i = len - 1; i >= 0; i--) {
    dp[i] = Array(len).fill(false);
    for (let j = i; j < len; j++) {
      if (s[i] === s[j]) {
        if (j - i <= 1) {
          dp[i][j] = true;
          res += 1;
        } else {
          dp[i][j] = dp[i + 1][j - 1];
          dp[i][j] && (res += 1);
        }
      }
    }
  }
  return res;
};

const s = "fdsklf";
const res = countSubstrings(s);
console.log("res->", res);

/* 
分析: 
对 str = "abba";

let dp;

// init
dp = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false]
]

// i = 3; j = 3; -> s[3] == s[3] -> j - i == 0 -> dp[3][3] = true
dp = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, true]
]


// i = 2; j = 2; -> s[2] == s[2] -> j - i == 0 -> dp[2][2] = true
dp = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, true, false],
  [false, false, false, true]
]

// i = 2; j = 3; -> s[2] != s[3] -> 不进入if -> dp[2][3]保持默认值false
dp = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, true, false],
  [false, false, false, true]
]

// i = 1; j = 1; -> s[1] == s[1] -> j - i == 0 -> s[1][1] = true
dp = [
  [false, false, false, false],
  [false, true, false, false],
  [false, false, true, false],
  [false, false, false, true]
]

// i = 1; j = 2; -> s[1] == s[2] -> j - i == 1 -> dp[1][2] = true
dp = [
  [false, false, false, false],
  [false, true, true, false],
  [false, false, true, false],
  [false, false, false, true]
]

// i = 1; j = 3; -> s[1] != s[3] -> 不进入if -> dp[1][3]保持默认值false
dp = [
  [false, false, false, false],
  [false, true, true, false],
  [false, false, true, false],
  [false, false, false, true]
]

// i = 0; j = 0; -> s[0] == s[0] -> j - i == 0 -> dp[0][0] = true
dp = [
  [true, false, false, false],
  [false, true, true, false],
  [false, false, true, false],
  [false, false, false, true]
]

// i = 0; j = 1; -> s[0] != s[1] -> 不进入if -> dp[0][1]保持默认值false
dp = [
  [true, false, false, false],
  [false, true, true, false],
  [false, false, true, false],
  [false, false, false, true]
]

// i = 0; j = 2; -> s[0] != s[2] -> 不进入if -> dp[0][2]保持默认值false
dp = [
  [true, false, false, false],
  [false, true, true, false],
  [false, false, true, false],
  [false, false, false, true]
]

// i = 0; j = 3; -> s[0] == s[3] -> j - i == 2 -> dp[0][3] = dp[1][2] = true;
dp = [
  [true, false, false, true],
  [false, true, true, false],
  [false, false, true, false],
  [false, false, false, true]
]

实际有意义的半区在右上部分
(dp[i][j] 表示 [i, j] 之间是否是回文串， dp[2][3]的含义与dp[3][2]相同，不可以重复计算)

*/