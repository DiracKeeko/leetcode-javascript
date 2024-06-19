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


// 贪心思路
// sumMaxArr[i] 是[0, i]位置任取连续子数组的最大和
// 返回sumMaxArr的最大值
var maxSubArray = function(nums) {
  // sumMaxArr[i] 表示[0, i]位置，任取连续子数组的最大和 
  const sumMaxArr = [nums[0]]; // 最少需要有一位，所以maxArr[0]必等于nums[0]

  for (let i = 1; i < nums.length; i++) {
    const preMax = sumMaxArr[i - 1] > 0 ? sumMaxArr[i - 1] : 0;
    sumMaxArr[i] = preMax + nums[i];
  }
  console.log(sumMaxArr);
  return Math.max(...sumMaxArr);
}

const test = [-2,1,-3,4,-1,2,1,-5,4];
const res = maxSubArray(test);
console.log({res});
