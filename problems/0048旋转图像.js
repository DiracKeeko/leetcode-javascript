/* 
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
*/

/* 
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]
*/

/* 
题目要求将一个 n x n 的二维矩阵顺时针旋转 90 度，且必须 原地 (in-place) 修改，这意味着你不能开辟一个新的矩阵来存放结果。这道题考察的不是复杂的算法，而是对几何变换和数组索引操作的敏锐度。

核心思路：几何分解直接去想“怎么把这个元素挪到旋转后的位置”通常会写出非常复杂的四路交换逻辑。

其实，顺时针旋转 90 度可以分解为两个非常简单的几何变换：
1. 转置 (Transpose)：沿着左上到右下的主对角线进行翻转。此时 (i, j) 变为 (j, i)。
2. 左右镜像翻转 (Reverse rows)：将每一行进行左右翻转。此时 (j, i) 变为 (j, n-1-i)。

举个例子：
1 2 3      1 4 7      7 4 1
4 5 6  ->  2 5 8  ->  8 5 2
7 8 9      3 6 9      9 6 3
(原图)     (转置)     (最终旋转)
*/

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
  const size = matrix.length;
  // 1. 转置矩阵 (沿着对角线翻转)
  // 注意：j 从 i 开始，只处理右上三角，否则换过去又换回来了
  for (let i = 0; i < size; i++) {
    for (let j = i; j < size; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // 2. 翻转每一行
  for (let i = 0; i < size; i++) {
    matrix[i].reverse();
  }
};

/* 
Accepted
21/21 cases passed (0 ms)
Your runtime beats 100 % of javascript submissions
Your memory usage beats 46.07 % of javascript submissions (54.6 MB)
耗时 0:2:29
*/