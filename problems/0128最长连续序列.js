/*
 * [128] 最长连续序列
 */

/* 
给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
*/

/* 
示例 1：

输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

示例 2：

输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9

*/

// v1 
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  if (!nums.length) {
    return 0;
  }
  const uniArr = [...new Set(nums)].sort((a, b) => a - b);
  let max = 0;
  let temp = 1;
  for (let i = 1; i < uniArr.length; i++) {
    const curNum = uniArr[i];
    const prevNum = uniArr[i - 1];
    if (curNum === prevNum + 1) {
      temp += 1;
    } else {
      max = Math.max(max, temp);
      temp = 1;
    }
  }
  max = Math.max(max, temp);
  return max;
};

/* 
v1 
Accepted
84/84 cases passed (78 ms)
Your runtime beats 6.44 % of javascript submissions
Your memory usage beats 13.79 % of javascript submissions (81.8 MB)
耗时 0:6:20
*/

// v2
var longestConsecutive = function(nums) {
  let numSet = new Set(nums);
  let res = 0;

  for (const curNum of numSet) {
    if (!numSet.has(curNum - 1)) {
      let streakNum = 0;
      let val = curNum;
      while (numSet.has(val)) {
        streakNum += 1;
        val += 1;
      }
      res = Math.max(streakNum, res);
    }
  }

  return res;
};

/* 
Accepted
84/84 cases passed (52 ms)
Your runtime beats 22.69 % of javascript submissions
Your memory usage beats 76.42 % of javascript submissions (80.4 MB)
*/