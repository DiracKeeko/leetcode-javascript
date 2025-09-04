/* 
给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。
*/

/* 
输入：height = [1,1]
输出：1

输入: height = [3, 2, 4, 1]
输出: 6
*/

// v1 找数组最大值，(这个最大值是容器的高)，再用双指针找容器左右最高的边
var maxArea = function(height) {
  const max = Math.max(...height); // max height
  
  let l = 0; // left index
  let r = height.length - 1; // right index
  while (height[l] !== max) {
    l += 1;
  }
  while (height[r] !== max) {
    r -= 1;
  }
  let res = (r - l) * max;
  
  const sortArr = Array.from(new Set(height)).sort((a, b) => b - a); // 去重，从小到大排序
  // 从这里开始 高度降低，l向左，r向右
  for (const h of sortArr) {
    for (let i = 0; i <= l; i++) {
      if (height[i] >= h) {
        l = i;
        break;
      }
    }
    for (let j = height.length - 1; j >= r; j--) {
      if (height[j] >= h) {
        r = j;
        break;
      }
    }
    const area = (r - l) * h;
    res = Math.max(res, area);
  }
  return res;
};

/* 
v1
65/65 cases passed (125 ms)
Your runtime beats 9.79 % of javascript submissions
Your memory usage beats 5.04 % of javascript submissions (66.8 MB)
*/

// v2 双指针，从外到内，找每个位置的最大面积 (h小的向中间前进)
var maxArea = function(height) {
  let l = 0;
  let r = height.length - 1;
  let res = 0;

  while (l < r) {
    const h = Math.min(height[l], height[r]);
    const area = (r - l) * h;
    res = Math.max(res, area);

    // 两侧中小的 那一个 向中间前进（相等的话可随意一边）。
    if (h === height[l]) {
      l += 1;
    } else {
      r -= 1;
    }
  }
  return res;
}

/* 
v2
65/65 cases passed (3 ms)
Your runtime beats 78.5 % of javascript submissions
Your memory usage beats 14.06 % of javascript submissions (63.7 MB)
*/