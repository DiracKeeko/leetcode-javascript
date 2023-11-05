/*
 * [213] 打家劫舍 II
 */

/* 
  你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。

  给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。
*/

/* 
  0213打家劫舍II
  和 0198打家劫舍的去别在于0213的房屋首尾相连。

  那么选中了首就不能选尾
    选中了尾就不能选首

  将0198 拆分为去头、去尾两种情况就可以解了
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(arr) {
  if (arr.length === 1) {
    return arr[0];
  }
  
  const res1 = robArr(arr.slice(1));
  arr.pop();
  const res2 = robArr(arr);
  return Math.max(res1, res2);

  function robArr(nums) {
    const dp = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[nums.length - 1];
  };
};