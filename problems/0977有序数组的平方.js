/*
 * [977] 有序数组的平方
 */

/* 
给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1：
  输入：nums = [-4,-1,0,3,10]
  输出：[0,1,9,16,100]
  解释：平方后，数组变为 [16,1,0,9,100]
  排序后，数组变为 [0,1,9,16,100]
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  const newArr = nums.map(item => Math.abs(item));
  newArr.sort((a, b) => a - b);
  return newArr.map(item => item ** 2);
};

function swap(A, i, j) {
  const t = A[i];
  A[i] = A[j];
  A[j] = t;
}

var sortedSquares2 = function(nums) {
  const squareArr = new Array(nums.length);
  let i = 0;
  let j = nums.length - 1;
  let k = j;
  while (i <= j) {
    const left = nums[i] ** 2;
    const right = nums[j] ** 2;
    if (left > right) {
      squareArr[k] = left;
      i += 1;
    } else {
      squareArr[k] = right;
      j -= 1;
    }
    k -= 1;
  }
  return squareArr;
};