/*
 * [257] 二叉树的所有路径
 */

/* 
  给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。
  叶子节点 是指没有子节点的节点。

  返回的结果是这种形式
  ["1->2->5","1->3"]
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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  const res = [];

  function traverse(node, path) {
    if (!node) {
      return;
    }
    if (!node.left && !node.right) {
      res.push(path + node.val);
    }
    traverse(node.left, path + node.val + "->");
    traverse(node.right, path + node.val + "->");
  }
  
  traverse(root, "");
  return res;
};