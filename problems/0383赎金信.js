/*
 * [383] 赎金信
 */

/* 
  给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。

  如果可以，返回 true ；否则返回 false 。

  magazine 中的每个字符只能在 ransomNote 中使用一次。
*/

/* 
输入：ransomNote = "aa", magazine = "ab"
输出：false

输入：ransomNote = "aa", magazine = "aab"
输出：true
*/

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */

// v1 用map记录
var canConstruct = function(ransomNote, magazine) {
  const ransomNoteMap = getCharMap(ransomNote);
  const magazineMap = getCharMap(magazine);
  for (const key in ransomNoteMap) {
    if (ransomNoteMap[key] > (magazineMap[key] || 0)) {
      return false;
    }
  }
  return true;

  function getCharMap(str) {
    const obj = {};
    for (const char of str) {
      obj[char] = obj[char] || 0;
      obj[char] += 1;
    }
    return obj;
  }
};
/* 
v1
128/128 cases passed (84 ms)
Your runtime beats 53.05 % of javascript submissions
Your memory usage beats 48.81 % of javascript submissions (43.7 MB)
*/

// v2 用arr记录 这种情况array的存储优于map存储
var canConstruct = function(ransomNote, magazine) {
  const arr = Array(26).fill(0);
  const base = "a".charCodeAt(0);
  magazine.split("").forEach(ch => arr[ch.charCodeAt(0) - base]++);
  ransomNote.split("").forEach(ch => arr[ch.charCodeAt(0) - base]--);
  return arr.every(item => item >= 0);
};
/* 
v2
128/128 cases passed (60 ms)
Your runtime beats 98.69 % of javascript submissions
Your memory usage beats 21.15 % of javascript submissions (45 MB)
*/

const ransomNote = "a", magazine = "b";
const res = canConstruct(ransomNote, magazine);
