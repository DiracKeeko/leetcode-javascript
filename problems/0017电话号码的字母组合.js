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
var letterCombinations = function (digits) {
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
    9: "wxyz",
  };
  function onceMore(letterArr, nextIndex) {
    if (nextIndex === digits.length) {
      return letterArr;
    }
    const nextNum = digits[nextIndex];
    const res = [];
    const nextLetterStr = map[nextNum];
    for (const curItem of letterArr) {
      for (const curLetter of nextLetterStr) {
        res.push(curItem + curLetter);
      }
    }
    return onceMore(res, nextIndex + 1);
  }

  const initArr = [""];
  return onceMore(initArr, 0);
};

/**
 * @param {string} digits
 * @return {string[]}
 */
// ↓ 回溯思想 --在这个量级用这个方案就可以了
var letterCombinations = function (digits) {
  const len = digits.length;
  if (len === 0) {
    // digits === ""的情况
    return [];
  }
  const arr = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];

  if (len === 1) {
    return arr[digits].split("");
  }

  let res = [];
  let path = [];
  backtrack(0);
  return res;

  function backtrack(i) {
    if (path.length === len) {
      res.push(path.join(""));
      return;
    }

    for (const char of arr[digits[i]]) {
      path.push(char);
      backtrack(i + 1);
      path.pop();
    }
  }
};

// ↓ 回溯思想 map 和 arr 在这个量级上的访问速度提升看不出来
var letterCombinations = function (digits) {
  const len = digits.length;
  if (len === 0) {
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
    9: "wxyz",
  };

  if (len === 1) {
    return map[digits].split("");
  }

  let res = [];
  let path = []; // 存储和弹出
  backtrack(digits, len, 0);
  return res;

  function backtrack(digits, l, i) {
    if (path.length === l) {
      res.push(path.join(""));
      return;
    }

    for (const char of map[digits[i]]) {
      path.push(char);
      backtrack(digits, l, i + 1);
      path.pop();
    }
  }
};
