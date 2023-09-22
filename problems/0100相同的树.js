/*
 * [100] 相同的树
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
  if (!p && !q) {
    return true;
  }
  if (p && q) {
    if (p.val === q.val) {
      return (isSameTree(p.left, q.left) && isSameTree(p.right, q.right));
    }
    return false;
  }
  return false;
};

// ↓ 梳理一下逻辑
var isSameTree = function(p, q) {
  if (!p && !q) {
    return true;
  }
  if (!p || !q) {
    return false;
  }
  if (p.val !== q.val) {
    return false;
  }
  return (isSameTree(p.left, q.left) && isSameTree(p.right, q.right));
};

// ↓ 一个取巧的写法 做算法的时候不推荐
var isSameTree = function(p, q) {
  return JSON.stringify(p) === JSON.stringify(q);
};