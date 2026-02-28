/* 
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号 子串 的长度。

左右括号匹配，即每个左括号都有对应的右括号将其闭合的字符串是格式正确的，比如 "(()())"。

*/

/* 
示例 1：

输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"
示例 2：

输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
示例 3：

输入：s = ""
输出：0

*/

// v1 用栈来解

// 重点: 有效括号的长度取决于它和上一个无法匹配的括号（边界）之间的距离。
var longestValidParentheses = function(s) {
  const stack = [-1];
  let max = 0;

  for (let i = 0; i < s.length; i++) {
    const curChar = s[i];
    if (curChar === "(") {
      stack.push(i);
    } else { // curChar 是右括号
      stack.pop();

      // 尝试匹配
      if (stack.length === 0) {
        stack.push(i);
      } else {  
        const len = i - stack[stack.length - 1];
        max = Math.max(len, max);
      }
    }
  }
  return max;
};

/* 
Accepted
235/235 cases passed (4 ms)
Your runtime beats 73.2 % of javascript submissions
Your memory usage beats 34.89 % of javascript submissions (58.7 MB)
耗时 0:7:15
*/