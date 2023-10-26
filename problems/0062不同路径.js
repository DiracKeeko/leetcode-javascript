/*
 * [62] 不同路径
 */

/* 
  一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

  机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

  问总共有多少条不同的路径？
*/

/* 
  输入：m = 3, n = 2
  输出：3

  解释：
  从左上角开始，总共有 3 条路径可以到达右下角。
  1. 向右 -> 向下 -> 向下
  2. 向下 -> 向下 -> 向右
  3. 向下 -> 向右 -> 向下
*/

/* 
  m行  n列
*/
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const firstLine = new Array(n).fill(1);
  const dp = [firstLine];

  for (let i = 1; i < m; i++) {
    dp[i] = [];
    for (let j = 0; j < n; j++) {
      if (j === 0) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
};
