/* 
  二叉树的锯齿形层序遍历
  给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 
  （即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）
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
var zigzagLevelOrder = function(root) {
  let res = [];
  function preOrder(node, deep) {
    if (node === null) return;
    if (res[deep] === undefined) res[deep] = [];
    if (deep % 2 === 0) {
      res[deep].push(node.val);
    } else {
      res[deep].unshift(node.val);
    }
    preOrder(node.left, deep + 1);
    preOrder(node.right, deep + 1);
  }
  preOrder(root, 0);
  return res;
};