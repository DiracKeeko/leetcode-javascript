/*
 * [326] 3 的幂
 */

/* 
给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 true ；否则，返回 false 。

整数 n 是 3 的幂次方需满足：存在整数 x 使得 n == 3 ^ x
*/

/* 
  2 ** 31 - 1 = 2147483647
  
  3 ** 19 = 1162261467
  3 ** 20 = 3486784401  这个数可以超出题目输入范围了
*/
/**
 * @param {number} n
 * @return {boolean}
 */

// v1 取巧解法
var isPowerOfThree = function(n) {
  return n > 0 && (3486784401 % n) === 0;
};
/* 
v1
Accepted
21040/21040 cases passed (172 ms)
Your runtime beats 63.61 % of javascript submissions
Your memory usage beats 59.6 % of javascript submissions (49.8 MB)
*/

// v2 正统解法
var isPowerOfThree = function(n) {
  if (n <= 0) {
    return false;
  }
  if ([1, 3, 9].includes(n)) {
    return true;
  }
  if (n % 3 !== 0) {
    return false;
  }
  return isPowerOfThree(n / 3);
};
/* 
v2
Accepted
21040/21040 cases passed (168 ms)
Your runtime beats 70.2 % of javascript submissions
Your memory usage beats 97.42 % of javascript submissions (49.4 MB)
*/