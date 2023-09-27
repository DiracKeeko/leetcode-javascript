/*
 * [404] 左叶子之和
 */

/* 
  给定二叉树的根节点 root ，返回所有左叶子之和。
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
var sumOfLeftLeaves = function(root) {
  let res = 0;
  if (!root) {
    return res;
  }

  function traverse(node) {
    if (!node) {
      return;
    }
    if (node.left) {
      traverse(node.left);
      if (!node.left.left && !node.left.right) {
        // 没有左子树也没有右子树 那么node.left是一个叶子节点
        res += node.left.val
      }
    }
    if (node.right) {
      traverse(node.right);
    }
  }
  traverse(root);
  return res;
};