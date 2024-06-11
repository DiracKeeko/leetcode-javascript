/*
 * [530] 二叉搜索树的最小绝对差
 */

/* 
给你一个二叉搜索树的根节点 root ，返回 树中任意两不同节点值之间的最小差值 。

差值是一个正数，其数值等于两值之差的绝对值。
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
 * @return {number}
 */
var getMinimumDifference = function(root) {
  const arr = [];

  function inorder(root) {
    if (!root) {
      return;
    }
    inorder(root.left);
    arr.push(root.val);
    inorder(root.right);
  }
  inorder(root);

  const res = [];
  for (let i = 1; i < arr.length; i++) {
    res.push(arr[i] - arr[i - 1]);
  }
  return Math.min(...res);
};