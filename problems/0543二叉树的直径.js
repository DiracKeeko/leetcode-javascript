/*
 * @lc app=leetcode.cn id=543 lang=javascript
 * @lcpr version=21909
 *
 * [543] 二叉树的直径
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
 * @return {number}
 */
// 二叉树的直径是指树中任意两个节点之间最长路径的长度。 这条路径可能经过也可能不经过根节点 root。
// 两节点之间路径的长度由它们之间边数表示。
var diameterOfBinaryTree = function(root) {
  let res = 0;
  function getHeight(root) {
    if (root === null) {
      return 0;
    }
    const l = getHeight(root.left);
    const r = getHeight(root.right);
    res = Math.max(res, l + r);
    return Math.max(l, r) + 1; // 返回当前树的树高
  }
  getHeight(root);
  return res;
};