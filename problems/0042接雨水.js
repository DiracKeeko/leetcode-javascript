/*
 * [42] 接雨水
 */

/* 
  给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
*/

/**
 * @param {number[]} height
 * @return {number}
 */

// v1 暴力搜索，按照竖列来计算每个槽位雨水的高度
var trap = function(height) {
  let sum = 0;
  const size = height.length;
  // index = 0 和 index = size - 1都不计算
  for (let i = 1; i < size - 1; i++) {
    const curH = height[i];
    
    // 找到i左边最高的高度
    let leftH = curH;
    for (let j = i - 1; j >= 0; j--) {
      leftH = Math.max(leftH, height[j]);
    }

    // 找到i右边最高的高度
    let rightH = curH;
    for (let j = i + 1; j < size; j++) {
      rightH = Math.max(rightH, height[j]);
    }

    // 算出当前i位置的高度
    const h = Math.min(leftH, rightH) - curH;

    if (h > 0) {
      sum += h;
    }
  }

  return sum;
};
/* 
v1
Accepted
322/322 cases passed (948 ms)
Your runtime beats 8.73 % of javascript submissions
Your memory usage beats 63.79 % of javascript submissions (41.9 MB)
耗时 0:11:31
*/

// v2 暴力搜索 + 双指针优化 (将找左右最大高度的过程优化，记录在两个数组中)
var trap = function(height) {
  let sum = 0;
  const size = height.length;

  const leftArr = Array(size).fill(0); // leftArr[i] 表示位置[0, i]范围内(包括0, i) 的最大高度
  const rightArr = Array(size).fill(0);

  leftArr[0] = height[0];
  for (let i = 1; i < size; i++) {
    leftArr[i] = Math.max(leftArr[i - 1], height[i]);
  }
  rightArr[size - 1] = height[size - 1];
  for (let i = size - 2; i >= 0; i--) {
    rightArr[i] = Math.max(rightArr[i + 1], height[i]);
  }

  // index = 0 和 index = size - 1都不计算
  for (let i = 1; i < size - 1; i++) {
    const h = Math.min(leftArr[i], rightArr[i]) - height[i];
    if (h > 0) {
      sum += h;
    }
  }

  return sum;
};
/* 
v2
322/322 cases passed (72 ms)
Your runtime beats 64.89 % of javascript submissions
Your memory usage beats 24.87 % of javascript submissions (44.6 MB)
*/