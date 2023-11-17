/*
 * [84] 柱状图中最大的矩形
 */

/* 
  给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

  求在该柱状图中，能够勾勒出来的矩形的最大面积。
*/

/* 
  输入：heights = [2,1,5,6,2,3]
  输出：10
  解释：最大的矩形为图中红色区域，面积为 10
*/

/**
 * @param {number[]} heights
 * @return {number}
 */

// v1 暴力搜索 找到以每个h[i]为基础的最大面积
// 搜索方式,找到h[i]左边第一个比h[i]小和右边第一个比h[i]小的元素，记录左右index，算出宽度w, 再用s = h * w 算出面积，与外部max比较，保留最大值。
var largestRectangleArea = function(heights) {
  let max = 0;

  for (let i = 0; i < heights.length; i++) {
    let left = i;
    let right = i;
    const curH = heights[i];
    for (; left >= 0; left--) {
      if (heights[left] < curH) {
        break;
      }
    }
    for (; right < heights.length; right++) {
      if (heights[right] < curH) {
        break;
      }
    }
    const w = right - left - 1;
    const s = w * curH;
    max = Math.max(max, s);
  }
  return max;
};
// v1暴力搜索会超时

// v2 暴力搜索优化 (优化left和right的查找过程)
var largestRectangleArea = function(heights) {
  let max = 0;
  const size = heights.length;

  // 用leftArr数组记录h[i]左侧第一个比h[i]小的元素的index
  const leftArr = Array(size).fill(-1);
  for (let i = 1; i < size; i++) {
    const curH = heights[i];
    const leftH = heights[i - 1];
    if (leftH < curH) {
      leftArr[i] = i - 1;
    } else if (leftH === curH) {
      leftArr[i] = leftArr[i - 1];
    } else {
      // leftH > curH
      let leftIndex = i - 2;
      for (; leftIndex >= 0; leftIndex--) {
        if (heights[leftIndex] < curH) {
          break;
        }
      }
      leftArr[i] = leftIndex;
    }
  }

  // 用rightArr数组记录h[i]右侧第一个比h[i]小的元素的index
  const rightArr = Array(size).fill(size);
  for (let i = size - 2; i >= 0; i--) {
    const curH = heights[i];
    const rightH = heights[i + 1];
    if (rightH < curH) {
      rightArr[i] = i + 1;
    } else if (rightH === curH) {
      rightArr[i] = rightArr[i + 1];
    } else {
      // rightH > curH
      let rightIndex = i + 2;
      for (; rightIndex < size; rightIndex++) {
        if (heights[rightIndex] < curH) {
          break;
        }
      }
      rightArr[i] = rightIndex;
    }
  }

  for (let i = 0; i < heights.length; i++) {
    const curH = heights[i];
    const w = rightArr[i] - leftArr[i] - 1;
    const s = w * curH;
    max = Math.max(max, s);
  }
  return max;
};
/* 
v2 已经可以通过
Accepted
98/98 cases passed (452 ms)
Your runtime beats 7.29 % of javascript submissions
Your memory usage beats 89.91 % of javascript submissions (52.1 MB)
*/

