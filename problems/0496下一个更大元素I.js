/*
 * [496] 下一个更大元素 I
 */

/* 
nums1 中数字 x 的 下一个更大元素 是指 x 在 nums2 中对应位置 右侧 的 第一个 比 x 大的元素。

给你两个 没有重复元素 的数组 nums1 和 nums2 ，下标从 0 开始计数，其中nums1 是 nums2 的子集。

对于每个 0 <= i < nums1.length ，找出满足 nums1[i] == nums2[j] 的下标 j ，并且在 nums2 确定 nums2[j] 的 下一个更大元素 。如果不存在下一个更大元素，那么本次查询的答案是 -1 。

返回一个长度为 nums1.length 的数组 ans 作为答案，满足 ans[i] 是如上所述的 下一个更大元素 。
*/

/* 
  输入：nums1 = [2,4], nums2 = [1,2,3,4].
  输出：[3,-1]
  解释：nums1 中每个值的下一个更大元素如下所述：
  - 2 ，用加粗斜体标识，nums2 = [1,2,3,4]。下一个更大元素是 3 。
  - 4 ，用加粗斜体标识，nums2 = [1,2,3,4]。不存在下一个更大元素，所以答案是 -1 。
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */

// v1 用0739每日温度的数组方式来存储结果，再从nums1中查找。
var nextGreaterElement = function(nums1, nums2) {
  const res = Array(nums2.length).fill(-1);
  const stack = [0];
  for (let i = 1; i < nums2.length; i++) {
    let topIndex = stack[stack.length - 1];
    if (nums2[i] > nums2[topIndex]) {
      while (stack.length && nums2[i] > nums2[topIndex]) {
        res[topIndex] = nums2[i];
        stack.pop();
        topIndex = stack[stack.length - 1];
      }
      stack.push(i);
    } else {
      stack.push(i);
    }
  }
  
  const finalRes = nums1.map(item => res[nums2.indexOf(item)]);
  return finalRes;
};

// v2 用map来存储单调栈的结果
var nextGreaterElement = function(nums1, nums2) {
  const map = {};
  const stack = [0];
  for (let i = 1; i < nums2.length; i++) {
    let topIndex = stack[stack.length - 1];
    if (nums2[i] > nums2[topIndex]) {
      while (stack.length && nums2[i] > nums2[topIndex]) {
        map[nums2[topIndex]] = nums2[i];
        stack.pop();
        topIndex = stack[stack.length - 1];
      }
      stack.push(i);
    } else {
      stack.push(i);
    }
  }
  
  const finalRes = nums1.map(item => map[item] || -1);
  return finalRes;
};

// v3 在v2的基础上极度精简代码，实测多次提交 v3的执行效率最高
var nextGreaterElement = function (nums1, nums2) {
  const map = {};
  const stack = [0];
  for (let i = 1; i < nums2.length; i++) {
    while (stack.length && nums2[i] > nums2[stack[stack.length - 1]]) {
      const topIndex = stack.pop();
      map[nums2[topIndex]] = nums2[i];
    }
    stack.push(i);
  }

  const finalRes = nums1.map((item) => map[item] || -1);
  return finalRes;
};

/* 
v3
  Accepted
    16/16 cases passed (56 ms)
    Your runtime beats 97.68 % of javascript submissions
    Your memory usage beats 44.27 % of javascript submissions (43.2 MB)
*/

// v4 stock仅存储nums1中的元素 这个是一个不同于v1, v2, v3的思路
var nextGreaterElement = function (nums1, nums2) {
  const l1= nums1.length;
  const res = Array(l1).fill(-1);
  const stock = [];
  for (const item of nums2) {
    while (stock.length && item > stock[stock.length - 1]) {
      const pre = stock.pop();
      const preIndex = nums1.indexOf(pre);
      res[preIndex] = item;
    }
    if (nums1.includes(item)) {
      stock.push(item);
    }
  }
  return res;
};

// v5 v4变体 在v4基础上加一个numToIndexMap存储index信息
var nextGreaterElement = function (nums1, nums2) {
  const l1 = nums1.length;
  const res = Array(l1).fill(-1);
  const stock = [];
  const numToIndexMap = new Map();
  for (let i = 0; i < l1; i++) {
    numToIndexMap.set(nums1[i], i);
  }

  for (const item of nums2) {
    while (stock.length && item > stock[stock.length - 1]) {
      const pre = stock.pop();
      const preIndex = numToIndexMap.get(pre);
      res[preIndex] = item;
    }
    if (numToIndexMap.has(item)) {
      stock.push(item);
    }
  }
  return res;
};