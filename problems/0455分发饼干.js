/* 
  [455] 分发饼干

  假设你是一位家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

  对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。
*/

/* 
示例 1:

输入: g = [1,2,3], s = [1,1]
输出: 1
解释: 
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。

*/

/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
// ↓ 用大饼干去满足胃口大的小孩
var findContentChildren = function(g, sizeArr) {
  g.sort((a, b) => b - a);
  sizeArr.sort((a, b) => b - a);
  let res = 0;
  let gi = 0;
  let si = 0;
  while (gi < g.length) {
    // if (sizeArr[si] >= g[gi]) {
    //   res += 1;
    //   si += 1;
    //   gi += 1;
    // } else {
    //   gi += 1;
    // }
    // 上面代码变为下面
    if (sizeArr[si] >= g[gi]) {
      res += 1;
      si += 1;
    }
    gi += 1;
  }
  return res;
};

// ↓ 优先喂饱小胃口的小朋友
var findContentChildren = function(g, sizeArr) {
  g.sort((a, b) => a - b);
  sizeArr.sort((a, b) => a - b);
  let res = 0;
  let gIndex = 0;
  for (let i = 0; i < sizeArr.length; i++) {
    if (gIndex === g.length) {
      break;
    }
    if (sizeArr[i] >= g[gIndex]) {
      res += 1;
      gIndex += 1;
    }
  }
  return res;
};