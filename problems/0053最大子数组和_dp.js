/*
 * [53] 最大子数组和
 */

/* 
  给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

  子数组 是数组中的一个连续部分。
*/
/**
 * @param {number[]} nums
 * @return {number}
 */

// 基本是暴力解，会超时
var maxSubArray = function(nums) {
  let max = -Infinity;
  // i从前到后，<0就放弃。
  // 找从i开始(nums[i]>0) 到达结束位置的最大的值

  for (let i = 0; i < nums.length; i++) {
    max = Math.max(max, getMaxSum(i));
  }
  return max;

  function getMaxSum(startIndex) {
    let partMax = 0;
    let sum = 0;
    for (let i = startIndex; i < nums.length; i++) {
      sum += nums[i];
      partMax = Math.max(partMax, sum);
    }
    return partMax;
  }
};


// 动态规划思路
/* 
1、dp[i] 是nums数组中，取以nums[i]为结尾子数组的最大和

2、dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
  dp[i]有两种方式可以推得: 1.当前nums[i]加入连续子数组; 2.当前nums[i]不加入前面的子数组，而是从头开始

3、dp[0] = nums[0]

4、一层for循环，从前到后
*/
// 返回sumMaxArr的最大值
var maxSubArray = function(nums) {
  const dp = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    // dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    dp[i] = dp[i - 1] < 0 ? nums[i] : dp[i - 1] + nums[i]
  }
  // console.log(dp);
  return Math.max(...dp);
}

const test = [-2,1,-3,4,-1,2,1,-5,4];
const res = maxSubArray(test);
console.log({res});
