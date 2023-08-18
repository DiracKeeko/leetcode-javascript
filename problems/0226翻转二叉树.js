/*
 * @lc app=leetcode.cn id=226 lang=javascript
 * @lcpr version=21909
 *
 * [226] 翻转二叉树
 * 
 * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
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
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
  if (root === null) {
    return null;
  }
  [root.left, root.right] = [root.right, root.left];
  invertTree(root.left);
  invertTree(root.right);
  return root;
};
