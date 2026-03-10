/*
 * [76] 最小覆盖子串
 */

/* 
给定两个字符串 s 和 t，长度分别是 m 和 n，返回 s 中的 最短窗口 子串，使得该子串包含 t 中的每一个字符（包括重复字符）。如果没有这样的子串，返回空字符串 ""。

测试用例保证答案唯一。
*/

/* 
示例 1：
输入：s = "ADOBECODEBANC", t = "ABC"
输出："BANC"
解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。

示例 2：
输入：s = "a", t = "a"
输出："a"
解释：整个字符串 s 是最小覆盖子串。

示例 3:
输入: s = "a", t = "aa"
输出: ""
解释: t 中两个字符 'a' 均应包含在 s 的子串中，
因此没有符合条件的子字符串，返回空字符串。
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

// 解题思路是滑动窗口
var minWindow = function(s, t) {
  const sLen = s.length;
  const tLen = t.length;
  if (sLen === 0 || tLen === 0 || sLen < tLen) {
    return "";
  }

  let need = {};
  let window = {};
  for (const str of t) {
    need[str] = need[str] || 0;
    need[str] += 1;
  }

  let left = 0;
  let right = 0;
  // 窗口起始, 结束位置  [left, right)
  let minLen = sLen + 1;
  let res = "";
  let distance = 0;
  while (right < sLen) {
    const rightStr = s[right];
    if (!need[rightStr]) {
      right += 1;
      continue;
    }
    window[rightStr] = window[rightStr] || 0;
    if (window[rightStr] < need[rightStr]) { 
      distance += 1; // distance 处理
    }
    window[rightStr] += 1;
    right += 1;

    while (distance === tLen) { // 这个条件务必注意
      const curLen = right - left;
      if (curLen < minLen) {
        minLen = curLen;
        res = s.slice(left, right);
      }

      const leftStr = s[left];
      if (!need[leftStr]) {
        left += 1;
        continue;
      }
      window[leftStr] = window[leftStr] || 0;
      if (window[leftStr] === need[leftStr]) {
        distance -= 1; // distance 处理, 只在相等的时候减一
      }
      window[leftStr] -= 1;
      left += 1;
    }
  }

  return res;
};
/* 
Accepted
268/268 cases passed (30 ms)
Your runtime beats 41.56 % of javascript submissions
Your memory usage beats 34.98 % of javascript submissions (58.1 MB)
耗时 0:27:4
*/

// gemini解法

