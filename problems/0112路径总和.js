/*
 * [112] 路径总和
 */

/* 
  给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true ；否则，返回 false 。

  叶子节点 是指没有子节点的节点。
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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
  const pathArr = [];
  if (!root) {
    return false;
  }

  function traverse(node, upperPathSum) {
    const curPathSum = upperPathSum + node.val;
    if (!node.left && !node.right) {
      pathArr.push(curPathSum);
      return;
    }
    node.left && traverse(node.left, curPathSum);
    node.right && traverse(node.right, curPathSum);
  }
  traverse(root, 0);
  return pathArr.includes(targetSum);
};

// v2 final  与上一版相同
var hasPathSum = function(root, targetSum) {
  if (!root) {
    return false;
  }
  
  const arr = [];
  function recursion(node, preSum) {
    const sum = node.val + preSum; 
    if (!node.left && !node.right) {
      arr.push(sum);
      return;
    }
    node.left && recursion(node.left, sum);
    node.right && recursion(node.right, sum);
  }
  
  recursion(root, 0);
  return arr.includes(targetSum);
};