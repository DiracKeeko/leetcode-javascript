/*
 * [72] 编辑距离
 */

/* 
  给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数  。

  你可以对一个单词进行如下三种操作：
    插入一个字符
    删除一个字符
    替换一个字符
  

*/

/* 
示例 1：
  输入：word1 = "horse", word2 = "ros"
  输出：3
  解释：
  horse -> rorse (将 'h' 替换为 'r')
  rorse -> rose (删除 'r')
  rose -> ros (删除 'e')
*/

/* 
1、dp table的含义
  dp[i][j] 表示word1中[0, i-1]的部分 与 word2中[0, j-1]部分的最小编辑距离

2、推导公式
  如果word1[i - 1] === word2[j - 1]，那么 dp[i][j] = dp[i - 1][j - 1];
  
  如果word1[i - 1] !== word2[j - 1]，有三种可能的操作
    1、删: word1[i - 1]需要删除一个元素
            => word1的[0, i-2]部分 与 word2的[0, j-1]部分最近编辑距离 再加上一个操作。
            => dp[i][j] = dp[i - 1][j] + 1
    2、增: word1[i - 1]需要增加一个元素 (等价于word2[j - 1]删除一个元素) 
            => word2[j - 1]删除一个元素，那么就是以下标 i-1 为结尾的word1 与 j-2 为结尾的word2的最近编辑距离 再加上一个操作。
            => dp[i][j] = dp[i][j - 1] + 1;
    3、换: 替换word1中的 i-1 位置的元素 使其与word2[j - 1]相同，此时不用增删加元素。
            => dp[i][j] = dp[i - 1][j - 1] + 1;

  if (word1[i - 1] === word2[j - 1]) {
    dp[i][j] = dp[i - 1][j - 1];
  } else {
    dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
  }

3、初始化
  dp[i][0] = i; dp[0][j] = j;

4、遍历顺序
  两层for循环，i, j都从1开始，从小到大

*/
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const [l1, l2] = [word1.length, word2.length];
  const dp = [
    Array(l2 + 1)
      .fill(0)
      .map((item, index) => index),
  ];

  for (let i = 1; i <= l1; i++) {
    dp[i] = [i];
    for (let j = 1; j <= l2; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
      }
    }
  }
  console.table(dp);
  return dp[l1][l2];
};

const w1 = "horse",
  w2 = "ros";
const res = minDistance(w1, w2);
console.log("res->", res);
