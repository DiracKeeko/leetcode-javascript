/*
 * @lc app=leetcode.cn id=110 lang=javascript
 * @lcpr version=21909
 *
 * [110] 平衡二叉树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 平衡二叉树：左右子树的高度差不超过1

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  function getHeight(root) {
    if (root === null) {
      return 0;
    }
    const l = getHeight(root.left);
    const r = getHeight(root.right);
    if (Math.abs(l - r) > 1) {
      return 10000; // max value === 5000
    }
    return Math.max(l, r) + 1;
  }
  return getHeight(root) < 10000;
};