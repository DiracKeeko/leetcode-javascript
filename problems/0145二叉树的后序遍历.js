/*
 * @lc app=leetcode.cn id=145 lang=javascript
 * @lcpr version=21909
 *
 * [145] 二叉树的后序遍历
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

// 后序遍历 左 右 根 (LRD)
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  const res = [];
  function postOrder(root) {
    if (!root) {
      return;
    }
    postOrder(root.left);
    postOrder(root.right);
    res.push(root.val);
  }
  postOrder(root);
  return res;
};