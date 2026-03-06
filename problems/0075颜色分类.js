/*
 * [75] 颜色分类
 */

/* 
  给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地 对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
  我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

  必须在不使用库内置的 sort 函数的情况下解决这个问题。
*/

/* 
示例 1：
  输入：nums = [2,0,2,1,1,0]
  输出：[0,0,1,1,2,2]
*/


/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function(nums) {
  let p1 = 0;
  let p2 = nums.length - 1;
  let cur = 0;
  while (cur <= p2) { // 这里必须用cur <= p2 
    // 因为 若p2 与 cur交换，交换之后的cur位置还没有进行校验
    if (nums[cur] === 0) {
      swap(nums, cur, p1);
      cur += 1;
      p1 += 1;
    } else if (nums[cur] === 1) {
      cur += 1;
    } else { // nums[cur] === 2;
      swap(nums, cur, p2);
      p2 -= 1;
    }
  }
};
function swap(nums, a, b) {
  const temp = nums[a];
  nums[a] = nums[b];
  nums[b] = temp;
}
