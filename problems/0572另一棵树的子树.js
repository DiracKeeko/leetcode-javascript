/*
 * [572] 另一棵树的子树
 */

/* 
  给你两棵二叉树 root 和 subRoot 。检验 root 中是否包含和 subRoot 具有相同结构和节点值的子树。如果存在，返回 true ；否则，返回 false 。
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
  if (!root && !subRoot) {
    return true;
  }

  let res = false;
  function isSameTree(p, q) {
    if (!p && !q) {
      return true;
    }
    if (p && q) {
      if (p.val === q.val) {
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
      }
    }
    return false;
  }

  function traverse(node) {
    if (!node) {
      return;
    }
    if (node.val === subRoot.val) {
      res = res || isSameTree(node, subRoot);
    }
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  
  return res;
};