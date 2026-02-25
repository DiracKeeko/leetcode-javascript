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
// 思路: 利用stack
/* 
  1. 循环遍历，向stack中放置leftPart，如果遇到rightPart，则将stack中的leftPart Pop出来，通过map找到rightPart，与对应的rightPart进行比较，如果key !== rightPart 直接终止，返回false
  2. 循环终止后，再看stack的长度，如果长度不为0，也是false
*/
// 
var isValid = function(s) {
  const bracketMap = {
    "(": ")",
    "[": "]",
    "{": "}"
  }
  const stack = [];
  for (const key of s) {
    if (key in bracketMap) {
      stack.push(key);
    } else {
      const leftPart = stack.pop();
      const rightPart = bracketMap[leftPart];
      if (rightPart !== key) {
        return false;
      }
    }
  }
  return stack.length === 0;
};

/* 
Accepted
102/102 cases passed (3 ms)
Your runtime beats 84.16 % of javascript submissions
Your memory usage beats 74.76 % of javascript submissions (55.6 MB)

*/