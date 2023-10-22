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
var eraseOverlapIntervals = function(intervals) {
  const len = intervals.length;
  if (len === 0 || len === 1) {
    return 0;
  }

  // 先排序 [is, ie]  is从小到大。若is相同，ie从小到大
  intervals.sort(([as, ae], [bs, be]) => {
    if (as === bs) {
      return as - bs;
    }
    return ae - be;
  })

  let i = 0;
  let j = 1;
  let count = 0;
  while (j < len) {
    const [, ie] = intervals[i];
    const [js] = intervals[j];
    if (ie > js) {
      count += 1;
      j += 1;
    } else {
      i = j;
      j += 1;
    }
  }
  return count;
};