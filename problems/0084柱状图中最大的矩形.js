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

// v21 暴力搜索优化 
// 用leftMin 和 rightMin数组记录当前元素左右两侧第一个比当前元素小的元素的下标
// v21 搜索leftMin, rightMin 的搜索过程依然不够快，会超时
var largestRectangleArea = function (heights) {
  const len = heights.length;

  const leftMinArr = [-1]; // 存放第i位左侧，第一个比heights[i]小的下标index
  for (let i = 1; i < len; i++) {
    let pre = i - 1;
    while (pre >= 0 && heights[pre] >= heights[i]) {
      pre -= 1;
    }
    leftMinArr.push(pre);
  }

  const rightMinArr = [len];
  for (let i = len - 2; i >= 0; i--) {
    let next = i + 1;
    while (next < len && heights[next] >= heights[i]) {
      next += 1;
    }
    rightMinArr.unshift(next);
  }

  let res = 0;
  for (let i = 0; i < len; i++) {
    const w = rightMinArr[i] - leftMinArr[i] - 1;
    const h = heights[i];
    const s = w * h;
    if (s > res) {
      res = s;
    }
  }
  return res;
};

// v22 搜索过程初步优化 (优化left和right的查找过程)
var largestRectangleArea = function(heights) {
  let max = 0;
  const len = heights.length;

  // 用leftMinArr数组记录h[i]左侧第一个比h[i]小的元素的index
  const leftMinArr = Array(len).fill(-1);
  for (let i = 1; i < len; i++) {
    const curH = heights[i];
    const leftH = heights[i - 1];
    if (leftH < curH) {
      leftMinArr[i] = i - 1;
    } else if (leftH === curH) {
      leftMinArr[i] = leftMinArr[i - 1];
    } else {
      // leftH > curH
      let leftIndex = i - 2;
      for (; leftIndex >= 0; leftIndex--) {
        if (heights[leftIndex] < curH) {
          break;
        }
      }
      leftMinArr[i] = leftIndex;
    }
  }

  // 用rightMinArr数组记录h[i]右侧第一个比h[i]小的元素的index
  const rightMinArr = Array(len).fill(len);
  for (let i = len - 2; i >= 0; i--) {
    const curH = heights[i];
    const rightH = heights[i + 1];
    if (rightH < curH) {
      rightMinArr[i] = i + 1;
    } else if (rightH === curH) {
      rightMinArr[i] = rightMinArr[i + 1];
    } else {
      // rightH > curH
      let rightIndex = i + 2;
      for (; rightIndex < len; rightIndex++) {
        if (heights[rightIndex] < curH) {
          break;
        }
      }
      rightMinArr[i] = rightIndex;
    }
  }

  for (let i = 0; i < heights.length; i++) {
    const curH = heights[i];
    const w = rightMinArr[i] - leftMinArr[i] - 1;
    const s = w * curH;
    max = Math.max(max, s);
  }
  return max;
};
/* 
v22 已经可以通过
Accepted
98/98 cases passed (452 ms)
Your runtime beats 7.29 % of javascript submissions
Your memory usage beats 89.91 % of javascript submissions (52.1 MB)
*/

// v23 final 搜索过程终极优化
var largestRectangleArea = function(heights) {
  const len = heights.length;
  const leftMinArr = Array(len).fill(-1); 
  // leftMinArr数组记录h[i]左侧第一个比h[i]小的元素的下标index
  // (最左的比h[i]小的元素)
  const rightMinArr = Array(len).fill(len);

  for (let i = 1; i < len; i++) {
    let pre = i - 1;
    while (pre >= 0 && heights[pre] >= heights[i]) {
      pre = leftMinArr[pre];
    }
    leftMinArr[i] = pre;
  }

  for (let i = len - 2; i >= 0; i--) {
    let next = i + 1;
    while (next < len && heights[next] >= heights[i]) {
      next = rightMinArr[next];
    }
    rightMinArr[i] = next;
  }

  let maxArea = 0;
  for (let i = 0; i < len; i++) {
    const w = rightMinArr[i] - leftMinArr[i] - 1;
    const h = heights[i];
    const s = w * h;
    if (s > maxArea) {
      maxArea = s;
    }
  }
  return maxArea;
};

/* 
v23 表现十分优秀 2024年9月26日
99/99 cases passed (80 ms)
Your runtime beats 93.44 % of javascript submissions
Your memory usage beats 69.5 % of javascript submissions (62.8 MB)
*/

/* 
一个leftMinArr的推导过程

const heights = [1, 2, 3, 3, 2, 1, 3];
const leftMinArr = [-1]; // 初始条件

i = 1;
  pre = 0;
  leftMinArr[1] = 0;
  leftMinArr = [-1, 0];
  
i = 2;
  pre = 1;
  leftMinArr[2] = 1;
  leftMinArr = [-1, 0, 1];

i = 3;
  pre = 2;
  pre = leftMinArr[2] = 1;
  leftMinArr[3] = 1;
  leftMinArr = [-1, 0, 1, 1];

i = 4;
  pre = 3;
  pre = leftMinArr[3] = 1;
  pre = leftMinArr[1] = 0;
  leftMinArr[4] = 0;
  leftMinArr = [-1, 0, 1, 1, 0];

i = 5;
  pre = 4;
  pre = leftMinArr[4] = 0;
  pre = leftMinArr[0] = -1;
  leftMinArr[5] = -1;
  leftMinArr = [-1, 0, 1, 1, 0, -1];

i = 6;
  pre = 5;
  leftMinArr[6] = 5;
  leftMinArr = [-1, 0, 1, 1, 0, -1, 5];
*/

// v3 单调栈 top -> bottom 单调递减
var largestRectangleArea = function(heights) {
  const hArr = [0, ...heights, 0]; // 首、尾 填充 0
  const size = hArr.length;
  const stack = [0];
  let max = 0;

  for (let i = 1; i < size; i++) {
    const curH = hArr[i];
    let topIndex = stack[stack.length - 1];
    if (curH > hArr[topIndex]) {
      stack.push(i);
    } else if (curH === hArr[topIndex]) {
      stack.pop();
      stack.push(i);
    } else {
      while (stack.length && curH < hArr[topIndex]) {
        const midH = hArr[stack.pop()];
        topIndex = stack[stack.length - 1];
        const leftIndex = topIndex;
        const w = i - leftIndex - 1;
        const s = w * midH;
        max = Math.max(s, max);
      }
      stack.push(i);
    }
  }
  return max;
}

/* 
v3
Accepted
98/98 cases passed (96 ms)
Your runtime beats 71.78 % of javascript submissions
Your memory usage beats 57.95 % of javascript submissions (55.8 MB)
*/