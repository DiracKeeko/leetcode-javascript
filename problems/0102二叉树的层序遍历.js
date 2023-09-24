/*
 * [102] 二叉树的层序遍历
 */
/* 
给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。
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
 * @return {number[][]}
 */

var levelOrder = function(root) {
  let res = [];
  if (!root) {
    return res;
  }

  let queue = [root];

  while (queue.length) {
    const valArr = [];
    const level = [];
    for (let i = 0; i < queue.length; i++) {
      const curNode = queue[i];
      valArr.push(curNode.val);
      curNode.left && level.push(curNode.left);
      curNode.right && level.push(curNode.right);
    }
    res.push(valArr);
    queue = level;
  }
  return res;
};

var levelOrder = function(root) {
  if (root === null) {
    return [];
  }
  const res = [];
  const queue = [];
  queue.push(root);
  while(queue.length) {
    const level = [];
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    res.push(level);
  }
  return res;
};