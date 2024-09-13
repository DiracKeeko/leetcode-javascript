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
// v1 二维dp数组
var findLength = function(nums1, nums2) {
  const len1 = nums1.length;
  const len2 = nums2.length;
  const dp = [Array(len2 + 1).fill(0)];

  let max = 0;
  for (let i = 1; i <= len1; i++) {
    dp[i] = [0];
    for (let j = 1; j <= len2; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = 0;
      }
      max = dp[i][j] > max ? dp[i][j] : max;
    }
  }
  return max;
};
// 对v1 感受一下连续子数组，递推关系

// v2
// dp[i] 表示nums1中 以nums1[i] 结尾的数字 与 nums2对比 取得的最长子数组的长度
var findLength = function(nums1, nums2) {
  const len = nums1.length;
  const dp = Array(len).fill(0);
  dp[0] = nums2.includes(nums1[0]) ? 1 : 0;
  for (let i = 1; i < len; i++) {
    let section = nums1.slice(i - dp[i - 1], i + 1);
    if (isCommon(section)) {
      dp[i] = dp[i - 1] + 1;
    } else {
      for (let j = i; j >= 0; j--) {
        section = nums1.slice(j, i + 1);
        if (isCommon(section)) {
          dp[i] = i + 1 - j;
        } else {
          break;
        }
      }
    }
  }
  return Math.max(...dp);

  function isCommon(section, arr = nums2) {
    const sectionLength = section.length;
    
    for (let i = 0; i <= arr.length - sectionLength; i++) {
      if (arr.slice(i, i + sectionLength).every((val, index) => val === section[index])) {
        return true;
      }
    }
    return false;
  }
};

// const nums1 = [0,0,0,0,1], nums2 = [1,0,0,0,0];
const nums1 = [1,0,0,0,1], nums2 = [1,0,0,1,1];

const res = findLength(nums1, nums2);
console.log("res->", res);