/*
 * [718] 最长重复子数组
 */

/* 
给两个整数数组 nums1 和 nums2 ，返回 两个数组中 公共的 、长度最长的子数组的长度 。
*/

/* 
示例 1：

输入：nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
输出：3
解释：长度最长的公共子数组是 [3,2,1] 。
*/

/* 
1、dp table的含义
dp[i][j] 表示以nums1中以nums1[i-1] 和 nums2中以nums2[j-1] 结尾的数组的公共最长子数组的长度

2、递推公式
if (nums1[i - 1] === nums2[j - 1]) {
  dp[i][j] = dp[i - 1][j - 1] + 1;
} else {
  dp[i][j] = 0;
}

3、初始化
dp[i][0] = 0;  dp[0][j] = 0; 其他位置不需要初始化

4、遍历顺序
两层for循环，都是从前到后。 i j遍历顺序都可以。 i, j都从1开始
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function(nums1, nums2) {
  const dp = [];
  dp[0] = Array(nums2.length + 1).fill(0);
  let max = 0;
  
  for (let i = 1; i <= nums1.length; i++) {
    dp[i] = [0];
    for (let j = 1; j <= nums2.length; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = 0;
      }
      max = dp[i][j] > max ? dp[i][j] : max;
    }
  }
  console.table(dp);
  return max;
};

// const nums1 = [0,0,0,0,1], nums2 = [1,0,0,0,0];
const nums1 = [1,0,0,0,1], nums2 = [1,0,0,1,1];

const res = findLength(nums1, nums2);
console.log("res->", res);