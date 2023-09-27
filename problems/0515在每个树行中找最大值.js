/*
 * [515] 在每个树行中找最大值
 */

/* 
  给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
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
 * @return {number[]}
 */
var largestValues = function(root) {
  const res = [];
  if (!root) {
    return res;
  }

  let queue = [root];
  while (queue.length) {
    const level = [];
    let maxVal = -Infinity;
    for (let node of queue) {
      maxVal = maxVal > node.val ? maxVal : node.val;
      node.left && level.push(node.left);
      node.right && level.push(node.right);
    }
    res.push(maxVal);
    queue = level;
  }
  return res;
};