/*
 * [435] 无重叠区间
 */

/* 
  给定一个区间的集合 intervals ，其中 intervals[i] = [starti, endi] 。返回 需要移除区间的最小数量，使剩余区间互不重叠 。
 */

/*
  输入: intervals = [[1,2],[2,3],[3,4],[1,3]]
  输出: 1
  解释: 移除 [1,3] 后，剩下的区间没有重叠。
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */

// v2
var eraseOverlapIntervals = function(intervals) {
  intervals.sort(([a], [b]) => a - b);
  let [, right] = intervals[0];
  let count = 0
  for (let i = 1; i < intervals.length; i++) {
    const [l, r] = intervals[i];
    if (l < right) {
      count += 1;
      right = Math.min(right, r); // 改成if 执行效率会提高很多
    } else {
      right = r;
    }
  }
  return count;
};