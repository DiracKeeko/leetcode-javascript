/*
 * [99] 恢复二叉搜索树
 */

/* 
  给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树 。
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
 * @return {void} Do not return anything, modify root in-place instead.
 */

var recoverTree = function(root) {
  if (!root) {
    return root;
  }

  let res = [];
  function traverse(node) {
    if (!node) {
      return;
    }
    traverse(node.left);
    res.push(node);
    traverse(node.right);
  }
  traverse(root);

  let first = undefined;
  let second = undefined;
  for (let i = 1; i < res.length; i++) {
    const prevNode = res[i - 1];
    const curNode = res[i];
    if (prevNode.val > curNode.val) {
      if (!first) {
        first = prevNode;
      }
      second = curNode;
    }
  }
  let temp = first.val;
  first.val = second.val;
  second.val = temp;
};