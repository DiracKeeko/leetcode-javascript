/*
 * [343] 整数拆分
 */

/* 
  给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。

  返回 你可以获得的最大乘积 。
*/

/* 
示例 1:
  输入: n = 2
  输出: 1
  解释: 2 = 1 + 1, 1 × 1 = 1。

示例 2:
  输入: n = 10
  输出: 36
  解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
*/

// 思路: 拆分成m个数，数值要近似相等
// 拆分为m个数字, m未知, 这是需要尝试的

/* 
dp五步
1. 确定dp数组（dp table）以及下标的含义
  dp[i]是拆分数字i 可以得到的最大乘积

2. 确定递推公式
  dp[i] = Math.max(j*dp[i-j], j * (i-j), dp[i]) => 固定i，要和各种拆分的情况比较,所以dp[i]要放进来

3. dp数组如何初始化
  默认填充0, dp[2] = 1

4. 确定遍历顺序
  从前到后，从小到大

5. 举例推导dp数组

*/
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function(n) {
  const dp = new Array(n + 1).fill(0);
  dp[2] = 1;

  for (let i = 3; i <= n; i++) {
    for (let j = 1; j <= i / 2; j++) {
      dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
    }
  }

  return dp[n];
};