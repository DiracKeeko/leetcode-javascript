/*
 * [56] 合并区间
 */

/* 
  以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
*/
/* 
  示例 1：
  输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
  输出：[[1,6],[8,10],[15,18]]
  解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
  
  示例 2：
  输入：intervals = [[1,4],[4,5]]
  输出：[[1,5]]
  解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
*/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

// 思路都一样，先排序，再比较 prevEnd 和 curStart
var merge = function(intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }

  intervals.sort(([as], [bs]) => as - bs);

  let i = 0;
  let j = 1;
  let [is, ie] = intervals[0];
  const res = [];
  while (j < intervals.length) {
    const [js, je] = intervals[j];
    if (ie >= js) {
      ie = Math.max(ie, je);
      j += 1;
    } else {
      res.push([is, ie]);
      i = j;
      j += 1;
      [is, ie] = intervals[i];
    }
  }
  res.push([is, ie]);
  return res;
};

// v2
var merge = function(intervals) {
  intervals.sort(([a], [b]) => a - b);
  const res = [];
  let [left, right] = intervals[0];
  for (let i = 0; i < intervals.length; i++) {
    const [l, r] = intervals[i];
    if (l <= right) {
      right = Math.max(r, right);
    } else {
      res.push([left, right]);
      [left, right] = [l, r];
    }
  }
  res.push([left, right]);
  return res;
};

// v3 
var merge = function(intervals) {
  intervals.sort(([a], [b]) => a - b); // 按 startIndex 从小到大排序
  const res = [intervals[0]];
  for (const arr of intervals) {
    const prevPair = res[res.length - 1];
    const [, pEnd] = prevPair;
    const [start, end] = arr;
    if (start <= pEnd) {
      prevPair[1] = Math.max(pEnd, end)
    } else {
      res.push(arr);
    }
  }
  return res;
};

const arr = [[1,3],[2,6],[8,10],[15,18]];
console.log(merge(arr));