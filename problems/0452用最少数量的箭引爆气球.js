/*
 * [452] 用最少数量的箭引爆气球
 */

/* 
  有一些球形气球贴在一堵用 XY 平面表示的墙面上。墙面上的气球记录在整数数组 points ，其中points[i] = [xstart, xend] 表示水平直径在 xstart 和 xend之间的气球。你不知道气球的确切 y 坐标。

  一支弓箭可以沿着 x 轴从不同点 完全垂直 地射出。在坐标 x 处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足  xstart ≤ x ≤ xend，则该气球会被 引爆 。可以射出的弓箭的数量 没有限制 。 弓箭一旦被射出之后，可以无限地前进。

  给你一个数组 points ，返回引爆所有气球所必须射出的 最小 弓箭数 。
*/

/* 
  输入：points = [[10,16],[2,8],[1,6],[7,12]]
  输出：2
  解释：气球可以用2支箭来爆破:
  -在x = 6处射出箭，击破气球[2,8]和[1,6]。
  -在x = 11处发射箭，击破气球[10,16]和[7,12]。
*/

/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
  if (points.length === 1) {
    return 1;
  }

  points.sort(([as], [bs]) => as - bs); // 按起始位置从小到大排序

  let i = 0;
  let j = 1;
  let count = 1;
  let [, end] = points[i];
  while (j < points.length) {
    const [js, je] = points[j];
    if (end >= js) {
      j += 1;
      end = Math.min(end, je);
    } else {
      i = j;
      [, end] = points[i];
      j += 1;
      count += 1;
    }
  }
  return count;
};

// v2 final
var findMinArrowShots = function(points) {
  points.sort(([a], [b]) => a - b); // 按起点从小到大排序
  let count = 0;
  let [, rightCover] = points[0];
  for (let i = 1; i < points.length; i++) {
    const [l, r] = points[i];
    if (l <= rightCover) {
      // rightCover = Math.min(r, rightCover); // 等价下面这行，但是下面的执行更快
      if (rightCover > r) {
        rightCover = r;
      }
    } else {
      count += 1;
      rightCover = r;
    }
  }
  count += 1;
  return count;
};

const testCase = [[3,9],[7,12],[3,8],[6,8],[9,10],[2,9],[0,9],[3,9],[0,6],[2,8]];
const res = findMinArrowShots(testCase);
console.log("res->", res);