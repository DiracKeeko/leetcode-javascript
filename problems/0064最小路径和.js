/*
 * [64] 最小路径和
 */

/* 
  给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

  说明：每次只能向下或者向右移动一步。
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
// v1
var minPathSum = function(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const firstLine = [grid[0][0]];
  
  // 初始化第一行
  for (let j = 1; j < n; j++) {
    firstLine[j] = firstLine[j - 1] + grid[0][j];
  }
  const res = [firstLine];

  for (let i = 1; i < m; i++) {
    res[i] = [];
    res[i][0] = res[i - 1][0] + grid[i][0]; // 初始化第一列
    for (let j = 1; j < n; j++) {
      res[i][j] = Math.min(res[i - 1][j], res[i][j - 1]) + grid[i][j];
    }
  }
  return res[m - 1][n - 1];
};

// v2 ↓ 直接在原数组 grid 上进行修改
// v2是一个非常高效的方式
var minPathSum = function(grid) {
  const m = grid.length;
  const n = grid[0].length;

  // 1. 初始化第一列（只能向下走）
  for (let i = 1; i < m; i++) {
      grid[i][0] += grid[i - 1][0];
  }

  // 2. 初始化第一行（只能向右走）
  for (let j = 1; j < n; j++) {
      grid[0][j] += grid[0][j - 1];
  }

  // 3. 填充剩余格子
  for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
          // 当前格子的最小和 = 左边和上边的最小值 + 当前格子的值
          grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
      }
  }

  return grid[m - 1][n - 1];
};

/* 
v2
Accepted
66/66 cases passed (0 ms)
Your runtime beats 100 % of javascript submissions
Your memory usage beats 95.97 % of javascript submissions (55.1 MB)
*/


