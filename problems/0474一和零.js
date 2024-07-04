/*
 * [474] 一和零
 */

/* 
  给你一个二进制字符串数组 strs 和两个整数 m 和 n 。

  请你找出并返回 strs 的最大子集的长度，该子集中 最多 有 m 个 0 和 n 个 1 。

  如果 x 的所有元素也是 y 的元素，集合 x 是集合 y 的 子集 。
*/

/* 
1. 确定dp数组（dp table）以及下标的含义
  dp[i][j] 最多i个0, j个1. 能放入dp[i][j]个字符串

2. 确定递推公式
  最外层遍历物品，每个dp[i][j]都与自己比较
  for (str of strs) {
    dp[i][j] = Math.max(dp[i][j], dp[i - zeroNum][j - oneNum] + 1)
  }

3. dp数组如何初始化
  row = m + 1, col = n + 1, 全部填充为0

4. 确定遍历顺序
  共3层for循环。
  最外层遍历物品，下面两层for循环遍历m, n。
  物品顺序无所谓，m, n的顺序一定要从大到小 (保证只放置一次)

5. 举例推导dp数组
*/
/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  const dp = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  for (const str of strs) {
    let x = 0; // zeroNum
    let y = 0; // oneNum
    for (const char of str) {
      if (char === "0") {
        x += 1;
      } else {
        y += 1;
      }
    }

    for (let i = m; i >= x; i--) {
      for (let j = n; j >= y; j--) {
        dp[i][j] = Math.max(dp[i][j], dp[i - x][j - y] + 1);
      }
    }

    // 下面这种方法就不行，从前到后遍历，物品被重复使用。
    // for (let i = x; i <= m; i++) {
    //   for (let j = y; j <= n; j++) {
    //     dp[i][j] = Math.max(dp[i][j], dp[i - x][j - y] + 1);
    //   }
    // }
  }
  console.table(dp);
  return dp[m][n];
};

// const strs = ["10", "0001", "111001", "1", "0"],
const strs = ["1", "0"],
  m = 5,
  n = 3;

const res = findMaxForm(strs, m, n);
console.log("res->", res);
