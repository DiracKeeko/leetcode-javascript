/*
 * [135] 分发糖果
 */

/* 
  n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。

  你需要按照以下要求，给这些孩子分发糖果：

  每个孩子至少分配到 1 个糖果。
  相邻两个孩子评分更高的孩子会获得更多的糖果。

  请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。
*/

/* 
  示例 1：
    输入：ratings = [1,0,2]
    输出：5
    解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。
  
  示例 2：
    输入：ratings = [1,2,2]
    输出：4
    解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
        第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。
*/

/**
 * @param {number[]} ratings
 * @return {number}
 */

// 解题思路，某个元素的两边分别处理。
// 先判断所有元素和元素右边元素的大小关系。
// 再判断所有元素和元素左边元素的大小关系。

// 不要同时判断左右。两次for循环，
// 一次从左到右(0, 1, 2, ...)  判断 nums[i] < nums[i + 1]
// 一次从右到左(len-1, len-2, ...) 判断 nums[i] > nums[i + 1]

var candy = function(ratings) {
  const res = [1];
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i] > ratings[i - 1]) {
      res[i] = res[i - 1] + 1;
    } else {
      res[i] = 1;
    }
  }

  for (let i = ratings.length - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      const guess = res[i + 1] + 1;
      res[i] = Math.max(guess, res[i]);
    } else {
      continue;
    }
  }

  const sum = res.reduce((acc, cur) => acc + cur, 0);
  return sum;
};