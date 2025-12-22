/*
 * [3] 无重复字符的最长子串
 */

// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。
/* 
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
*/

// v1
// 最原始的办法，遍历 - 找每一位左边最长的无重复子串，比较子串长度的最大值
var lengthOfLongestSubstring = function(s) {
  let max = 0;
  for (let i = 0; i <= s.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      const subStr = s.slice(j, i);
      const nextIndex = j - 1;
      if (nextIndex === -1) {
        max = Math.max(max, subStr.length);
        break;
      } else {
        const nextLetter = s[nextIndex];
        if (subStr.includes(nextLetter)) {
          max = Math.max(max, subStr.length);
          break;
        }
      }
    }
  }
  return max;
};

/* 
v1

988/988 cases passed (57 ms)
Your runtime beats 12.89 % of javascript submissions
Your memory usage beats 12.09 % of javascript submissions (60.1 MB)
*/


// v1的效率不高

// v2 也是一种遍历 效率不高
var lengthOfLongestSubstring = function(s) {
  let max = 0;
  for (let i = 0; i < s.length; i++) {
    const map = new Map();
    map.set(s[i], 1);
    for (let j = i + 1; j < s.length; j++) {
      const curChar = s[j];
      if (map.has(curChar)) {
        break;
      } else {
        map.set(curChar, 1);
      }
    }
    max = Math.max(map.size, max);
  }
  return max;
};

/* 
v2
Accepted
988/988 cases passed (149 ms)
Your runtime beats 6.8 % of javascript submissions
Your memory usage beats 14.57 % of javascript submissions (59.9 MB)
*/

// v3 使用双指针 (滑动窗口)
var lengthOfLongestSubstring = function(s) {
  let max = 0;
  const len = s.length;
  const map = new Map();
  let l = 0;
  let r = 0;
  
  while (l < len && r < len) {
    if (!map.has(s[r])) {
      map.set(s[r], true);
      r += 1;
      max = Math.max(max, map.size);
      // max = Math.max(max, r - l);
    } else {
      map.delete(s[l]);
      l += 1;
    }
  }
  return max;
};

/* 
v3
Accepted
988/988 cases passed (7 ms)
Your runtime beats 59.51 % of javascript submissions
Your memory usage beats 34.21 % of javascript submissions (57.6 MB)
*/