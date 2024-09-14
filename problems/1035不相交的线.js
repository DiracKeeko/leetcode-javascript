/*
 * [1035] 不相交的线
 */

// 注 与1143最长公共子序列完全一样

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxUncrossedLines = function(nums1, nums2) {
  const [l1, l2] = [nums1.length, nums2.length];
  const dp = [];

  for (let i = 0; i <= l1; i++) {
    dp[i] = [];
    for (let j = 0; j <= l2; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[l1][l2];
};

/* 
  review 2024年9月14日
*/