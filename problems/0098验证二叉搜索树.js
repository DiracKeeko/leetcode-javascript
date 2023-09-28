/*
 * [98] 验证二叉搜索树
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
 * @return {boolean}
 */
var isValidBST = function(root) {
  if (!root) {
    return false;
  }

  const valArr = [];
  function traverse(node) {
    if (!node) {
      return;
    }
    traverse(node.left);
    valArr.push(node.val);
    traverse(node.right);
  }
  traverse(root);

  for (let i = 1; i < valArr.length; i++) {
    const prevVal = valArr[i - 1];
    const curVal = valArr[i];
    if (prevVal >= curVal) {
      return false;
    }
  }
  return true;
};