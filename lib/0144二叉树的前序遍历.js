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
 * @return {number[]}
 */

// 前序遍历 -> 遍历顺序 根-左-右 (DLR)
var preorderTraversal = function(root) {
  const res = [];
  function preOrder(root) {
    if (!root) return;
    res.push(root.val);
    preOrder(root.left);
    preOrder(root.right);
  }
  preOrder(root);
  return res;
};