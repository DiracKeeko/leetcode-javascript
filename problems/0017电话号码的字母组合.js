/*
 * [17] 电话号码的字母组合
 */

/* 
  给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
  给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
*/

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if (digits.length === 0) {
    // digits === ""的情况
    return [];
  }
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz"
  }
  function onceMore(letterArr, nextIndex) {
    if (nextIndex === digits.length) {
      return letterArr;
    }
    const nextNum = digits[nextIndex];
    const res = [];
    const nextLetterStr = map[nextNum];
    for (const curItem of letterArr) {
      for (const curLetter of nextLetterStr) {
        res.push(curItem+curLetter);
      }
    }
    return onceMore(res, nextIndex + 1);
  }
  
  const initArr = [""];
  return onceMore(initArr, 0);
};