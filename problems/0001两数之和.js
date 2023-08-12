/* 
  给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

  你可以按任意顺序返回答案。
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

/* 
  时间复杂度：O(n)
  空间复杂度：O(n)
*/
var twoSum = function(nums, target) {
  let obj = {};
  for (let i = 0; i < nums.length; i++) {
    const curNum = nums[i];
    const needNum = target - curNum;
    if (curNum in obj) {
      return [i, obj[curNum]];
    } else {
      obj[needNum] = i;
    }
  }
};

/* 
  时间复杂度：O(n^2)
  空间复杂度：O(1)
*/
// var twoSum = function(nums, target) {
//   for (let i = 0; i < nums.length; i++) {
//     for (let j = i + 1; j < nums.length; j++) {
//       if (nums[i] + nums[j] === target) {
//         return [i, j];
//       }
//     }
//   }
// };