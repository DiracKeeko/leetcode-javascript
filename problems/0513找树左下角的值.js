/*
 * [513] 找树左下角的值
 */

/* 
  给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。

  假设二叉树中至少有一个节点。
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
var findBottomLeftValue = function(root) {
  let arr = [root];
  let res;

  while (arr.length) {
    res = arr[0].val;
    let n = [];

    for (const node of arr) {
      node.left && n.push(node.left);
      node.right && n.push(node.right);
    }

    arr = n;
  }

  return res;
};