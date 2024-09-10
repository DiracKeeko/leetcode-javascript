/*
 * [198] 打家劫舍
 */

/* 
  你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

  给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
*/

/* 
1. 确定dp数组（dp table）以及下标的含义
  dp[i] 表示[0, i]个房屋所能偷的最大金额

2. 确定递推公式
  dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])

3. dp数组如何初始化
  dp[0] = nums[0], dp[1] = Math.max(nums[0], nums[1]); 其他位置任意

4. 确定遍历顺序
  从前到后

5. 举例推导dp数组

*/
/**
 * @param {number[]} nums
 * @return {number}
 */
// v1
var rob = function(nums) {
  const dp = [nums[0], Math.max(nums[0], nums[1])];
  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  // return dp.pop(); // 不能用pop 否则 nums = [0] 这种用例 会返回NaN
  return dp[nums.length - 1];
};
/* 
v1
70/70 cases passed (64 ms)
Your runtime beats 24.16 % of javascript submissions
Your memory usage beats 60.1 % of javascript submissions (49 MB)
*/

// v2
// dp[i] 表示在选中nums[i]的情况下，所能获取的最大价值
var rob = function(nums) {
  const len = nums.length;
  if (len < 3) {
    return Math.max(...nums);
  }
  const dp = nums.slice(0, 2);
  dp[2] = nums[2] + nums[0];
  for (let i = 3; i < len; i++) {
    dp[i] = Math.max(dp[i - 2], dp[i - 3]) + nums[i];
  }
  return Math.max(...dp.slice(-2));
};
/* 
v2
70/70 cases passed (55 ms)
Your runtime beats 75.48 % of javascript submissions
Your memory usage beats 93.15 % of javascript submissions (48.9 MB)
*/