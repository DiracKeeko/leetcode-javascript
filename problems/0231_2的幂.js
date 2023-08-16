/* 
  给你一个整数 n，请你判断该整数是否是 2 的幂次方。如果是，返回 true ；否则，返回 false 。

  如果存在一个整数 x 使得 n == 2x ，则认为 n 是 2 的幂次方。
*/

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfTwo = function (n) {
  return n > 0 && (n & (n - 1)) === 0;
};


const and01 = 5 & 1; // 0101 & 0001 = 0001
// expected output: 1

const and02 = 5 & 2; // 0101 & 0010 = 0000
// expected output: 0

const and03 = 9 & 7; // 1001 & 0111 = 0001
// expected output: 1

const and04 = 9 & 8; // 1001 & 1000 = 1000
// expected output: 8

/* 
  2的n次幂
  在二进制的表示   在十进制的表示
  1               1
  10              2
  100             4
  1000            8
  10000           16
  ...

  n & (n - 1) === 0
  见下面两个例子
*/
const and05 = 8 & 7; // 1000 & 0111 = 0000
// expected output: 0

const and06 = 16 & 15; // 10000 & 01111 = 00000
// expected output: 0