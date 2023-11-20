/*
 * [242] 有效的字母异位词
 */

/* 
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
*/

/* 
输入: s = "anagram", t = "nagaram"
输出: true

输入: s = "rat", t = "car"
输出: false
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  const arr = Array(26).fill(0);
  const base = "a".charCodeAt(0);
  for (const ch of s) {
    arr[ch.charCodeAt(0) - base] += 1;
  }
  for (const ch of t) {
    arr[ch.charCodeAt(0) - base] -= 1;
  }
  return arr.every(v => v === 0);
};