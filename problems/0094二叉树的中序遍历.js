/*
 * [94] 二叉树的中序遍历
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// 中序遍历 左 根 右 (LDR)
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const res = [];
  function inOrder(root) {
    if (!root) return;
    inOrder(root.left);
    res.push(root.val);
    inOrder(root.right);
  }
  inOrder(root);
  return res;
};