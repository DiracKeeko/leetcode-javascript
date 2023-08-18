/*
 * @lc app=leetcode.cn id=104 lang=javascript
 * @lcpr version=21909
 *
 * [104] 二叉树的最大深度
 */


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  // ↓ 终止条件
  if (root === null) {
    return 0;
  }
  // ↓ 树的最大深度 = 左子树的深度 和 右子树深度 最大的那个 + 1
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};