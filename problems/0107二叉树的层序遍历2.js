/* 
  给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。
  （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
*/

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
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
  let res = [];
  function preOrder(node, deep) {
    if (node === null) return;
    if (res[deep] === undefined) res[deep] = [];
    res[deep].push(node.val);
    preOrder(node.left, deep + 1);
    preOrder(node.right, deep + 1);
  }
  preOrder(root, 0);
  return res.reverse();
};