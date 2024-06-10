/* 
  [105] 从前序与中序遍历序列构造二叉树

  给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。

  输入: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
  输出: [3,9,20,null,null,15,7]
*/

/* 
  解题思路，递归切割
  preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]

  1、preorder index = 0的位置就是root (preorder[0] = 3)
  2、用root去inorder里面找，切出来inorder左 和 inorder右 (leftArr = [9], rightArr = [15, 20, 7])
  3、如果有leftArr，说明有左子树，root.left.val = preorder[1]; root.right.val = preorder[leftArr.length+1]
  4、切分preOrder的左右子树 preorder.slice(1, leftArr.length + 1); preorder.slice(leftArr.length + 1);
  5、递归 recursion(root, pre, ino)
*/

var buildTree = function(preorder, inorder) {
  const root = new TreeNode(preorder[0]);

  function iteration(node, pre, ino) {
    const index = ino.indexOf(node.val);
    const left = ino.slice(0, index);
    const right = ino.slice(index + 1);
    if (left.length) {
      // 有length, 说明根节点(node)有左子树
      node.left = new TreeNode(pre[1]);
      iteration(node.left, pre.slice(1, left.length + 1), left);
    }
    if (right.length) {
      node.right = new TreeNode(pre[left.length + 1]);
      iteration(node.right, pre.slice(left.length + 1), right);
    }
  }

  iteration(root, preorder, inorder);
  return root;
};