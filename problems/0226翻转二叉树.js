/*
 * @lc app=leetcode.cn id=226 lang=javascript
 * @lcpr version=21909
 *
 * [226] 翻转二叉树
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
  function reverse(root) {
    if (root === null) {
      return null;
    }
    [root.left, root.right] = [root.right, root.left];
    reverse(root.left);
    reverse(root.right);
    return root
  }
  return reverse(root);
};
