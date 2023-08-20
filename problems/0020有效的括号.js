/* 
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  let bracketObj = {
    "(": ")",
    "[": "]",
    "{": "}"
  }
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    const curStr = s[i];
    if (curStr in bracketObj) {
      stack.push(curStr);
    } else {
      const popStr = stack.pop();
      if (curStr !== popStr) {
        return false
      }
    }
  }
  return !stack.length;
};