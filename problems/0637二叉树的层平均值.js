/*
 * [637] 二叉树的层平均值
 */
/* 
  给定一个非空二叉树的根节点 root , 以数组的形式返回每一层节点的平均值。与实际答案相差 10-5 以内的答案可以被接受。
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
var averageOfLevels = function(root) {
  const resArr = [];
  if (!root) {
    return res;
  }
  
  let queue = [root];
  while (queue.length) {
    const level = [];
    let sum = 0;
    for (let node of queue) {
      sum += node.val;
      node.left && level.push(node.left);
      node.right && level.push(node.right);
    }
    resArr.push(sum / queue.length);
    queue = level;
  }
  return resArr;
};