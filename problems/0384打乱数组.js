/*
 * [384] 打乱数组
 */

/* 
  给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 等可能 的。

  实现 Solution class:

  Solution(int[] nums) 使用整数数组 nums 初始化对象
  int[] reset() 重设数组到它的初始状态并返回
  int[] shuffle() 返回数组随机打乱后的结果
*/

/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
  this.nums = nums;
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function() {
  return this.nums;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
  const copyArr = [...this.nums];
  for (let i = copyArr.length - 1; i > 0; i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    // swap
    const temp = copyArr[ri];
    copyArr[ri] = copyArr[i];
    copyArr[i] = temp;
  }
  return copyArr;
};