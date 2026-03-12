/*
 * [85] 最大矩形
 */

/* 
给定一个仅包含 0 和 1 、大小为 rows x cols 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
*/

/* 
输入：matrix = [
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
输出：6

输入：matrix = [["1"]]
输出：1
*/

// 思路：拆分成两步，第一步是84题的解法，第二步找到hArr
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  const hArr = Array(n).fill(0);
  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === "1") {
        hArr[j] += 1;
      } else {
        hArr[j] = 0;
      }
    }
    const curMaxArea = maxArea(hArr);
    res = Math.max(res, curMaxArea);
  }
  return res;
};
function maxArea(heights) {
  const stack = [0];
  let maxArea = 0;
  const hArr = [0, ...heights, 0];

  for (let i = 1; i < hArr.length; i++) {
    const curH = hArr[i];
    let topIndex = stack[stack.length - 1];

    if (curH > hArr[topIndex]) {
      stack.push(i);
    } else if (curH === hArr[topIndex]) {
      stack.pop();
      stack.push(i);
    } else {
      while (stack.length > 0 && curH < hArr[topIndex]) {
        const midH = hArr[stack.pop()];
        const prevIndex = stack[stack.length - 1];
        const w = i - prevIndex - 1;
        const s = midH * w;
        maxArea = Math.max(s, maxArea);
        topIndex = prevIndex;
      }
      stack.push(i);
    }
  }
  return maxArea;
}

