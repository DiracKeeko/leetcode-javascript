/*
 * [429] N 叉树的层序遍历
 */

/* 
  给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。

  树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。
*/

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  const res = [];
  if (!root) {
    return res;
  }

  let queue = [root];
  while (queue.length) {
    const valArr = [];
    let level = [];
    for (let node of queue) {
      valArr.push(node.val);
      if (node.children) {
        level = level.concat(node.children);
      }
    }
    res.push(valArr);
    queue = level;
  }

  return res;
};