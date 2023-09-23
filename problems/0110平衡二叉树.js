/*
 * [110] 平衡二叉树
 */

// 平衡二叉树：左右子树的高度差不超过1

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
 * @return {boolean}
 */
var isBalanced = function(root) {
  function getHeight(root) {
    if (root === null) {
      return 0;
    }
    const l = getHeight(root.left);
    const r = getHeight(root.right);
    if (Math.abs(l - r) > 1) {
      return 10000; // max value === 5000
    }
    return Math.max(l, r) + 1;
  }
  return getHeight(root) < 10000;
};

// ↑ 优化解法

// ↓ 自己的思路
var isBalanced = function(root) {
  const res = [];
  function getDepth(node) {
    if (!node) {
      return 0;
    }
    const l = getDepth(node.left);
    const r = getDepth(node.right);
    res.push(Math.abs(l - r));
    return Math.max(l, r) + 1;
  }
  getDepth(root);
  return !res.some(item => item > 1);
};