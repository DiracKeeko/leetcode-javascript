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

// v3 单调栈
// 单调栈的解法是横向(一层一层的)计算雨水体积。
/* 
  单调栈存放height的下标
  单调栈为递增栈(height[i]从top到bottom单调增加)，分为三种情况

  1、height[i] < height[(stack.top()]    入栈 stack.push(i)
  2、height[i] === height[stack.top()]  先弹出，再将新的i入栈 stack.pop(); stack.push(i);
  3、height[i] > height[stack.top()]    计算雨水的体积
*/
var trap = function(height) {
  let sum = 0;
  const stack = [0];
  for (let i = 1; i < height.length; i++) {
    let topIndex = stack[stack.length - 1];
    const curH = height[i];
    if (curH < height[topIndex]) {
      stack.push(i);
    } else if (curH === height[topIndex]) {
      stack.pop();
      stack.push(i);
    } else {
      // height[i] > height[topIndex]
      while (stack.length && curH > height[topIndex]) {
        const bottomH = height[stack.pop()];
        topIndex = stack[stack.length - 1];
        if (stack.length) { 
          // 这里还有个特殊情况，如果凹槽底部找到了，但是左边没有柱子了，就不做计算。
          const leftH = height[topIndex];
          const h = Math.min(leftH, curH) - bottomH;
          const w = i - topIndex - 1;
          sum += h * w;
        }
      }
      stack.push(i);
    }
    console.log({i, sum});
  }
  return sum;
};
/* 
v3
322/322 cases passed (60 ms)
Your runtime beats 95.17 % of javascript submissions
Your memory usage beats 54.3 % of javascript submissions (43.4 MB)
*/
const test = [0,1,0,2,1,0,1,3,2,1,2,1];
const res = trap(test);