/*
 * @lc app=leetcode.cn id=剑指 Offer 54 lang=javascript
 * @lcpr version=21909
 *
 * [剑指 Offer 54] 二叉搜索树的第k大节点
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */

/* 
二叉搜索树的性质:
左子树的节点值都小于等于根节点值
右子树的节点值都大于等于根节点值
*/

var kthLargest = function(root, k) {
  let num = 0;
  function getNodeVal(root) {
    if (root === null) return;
    let right = getNodeVal(root.right);
    if (right !== undefined) return right;
    num++;
    if (num === k) return root.val;
    return getNodeVal(root.left);
  }
  return getNodeVal(root);
};