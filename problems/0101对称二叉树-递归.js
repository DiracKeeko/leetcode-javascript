/*
 * [101] 对称二叉树
 * 
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 */

var isSymmetric = function(root) {
  function check(a, b) {
    if (a === null && b === null) {
      return true;
    }
    if (a === null || b === null || a.val !== b.val) {
      return false;
    }
    return check(a.left, b.right) && check(a.right, b.left);
  }
  return check(root.left, root.right);
};