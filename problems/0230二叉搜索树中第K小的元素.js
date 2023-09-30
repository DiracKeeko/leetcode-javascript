/*
 * [230] 二叉搜索树中第K小的元素
 */

/* 
  给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。
*/

/* 
  二叉搜索树的性质:
  左子树的节点值都小于等于根节点值
  右子树的节点值都大于等于根节点值
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
 * @param {number} k
 * @return {number}
 */

var kthSmallest = function(root, k) {
  let res;
  let count = 0;
  function inOrder(node) {
    if (!node) {
      return;
    }
    inOrder(node.left);
    count += 1;
    if (count === k) {
      res = node.val;
      return;
    }
    inOrder(node.right);
  }
  inOrder(root);
  return res;
};