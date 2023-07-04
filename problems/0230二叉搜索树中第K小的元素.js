/* 
二叉搜索树的性质:
左子树的节点值都小于等于根节点值
右子树的节点值都大于等于根节点值
*/

var kthSmallest = function(root, k) {
  let num = 0;
  let res;
  function inOrder(root) {
    if (root === null) return;
    inOrder(root.left);
    num++;
    if (num === k) {
      res = root.val
      return;
    }
    inOrder(root.right);
  }
  inOrder(root);
  return res;
};