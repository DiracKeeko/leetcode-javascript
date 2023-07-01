/*
 * @lc app=leetcode.cn id=剑指 Offer 55 - I lang=javascript
 * @lcpr version=21909
 *
 * [剑指 Offer 55 - I] 二叉树的深度
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

// 从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  function getHeight(root) {
    if (root === null) {
      return 0;
    }
    return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
  }
  return getHeight(root);
};