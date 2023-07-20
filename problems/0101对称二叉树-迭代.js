/*
 * [101] 对称二叉树
 * 
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 */

var isSymmetric = function(root) {
  let a = root.left;
  let b = root.right;
  let stack1 = [];
  let stack2 = [];
  while (a || stack1.length) {
    while (a) {
      if (b === null || a.val !== b.val) {
        return false;
      }
      stack1.push(a);
      stack2.push(b);
      a = a.left;
      b = b.right;
    }
    if (b) {
      return false;
    }
    a = stack1.pop().right;
    b = stack2.pop().left;
  }
  return b === null;
};