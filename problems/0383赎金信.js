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
var canConstruct = function(ransomNote, magazine) {
  const ransomNoteMap = getCharMap(ransomNote);
  const magazineMap = getCharMap(magazine);
  console.log("ransomNoteMap->", ransomNoteMap);
  console.log("magazineMap->", magazineMap);
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

const ransomNote = "a", magazine = "b";
const res = canConstruct(ransomNote, magazine);
