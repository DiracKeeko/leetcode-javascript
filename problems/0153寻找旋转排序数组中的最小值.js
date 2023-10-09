/*
 * [153] 寻找旋转排序数组中的最小值
 */

/* 
  给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。

  数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

  你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

  输入：nums = [4,5,6,7,0,1,2]
  输出：0
  解释：原数组为 [0,1,2,4,5,6,7] ，旋转 4 次得到输入数组。
*/

// 两个升序数组排列在一起。
// 左边升序数组的值比任意一个右边的都大
// 最小值是唯一一个比左右都小的数字

/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const guess = (left + right) >> 1;
    const guessNum = nums[guess];
    const rightNum = nums[right];
    if (guessNum < rightNum) {
      right = guess;
    }
    if (guessNum > rightNum) {
      left = guess + 1;
    }
  }
  return nums[left];
};