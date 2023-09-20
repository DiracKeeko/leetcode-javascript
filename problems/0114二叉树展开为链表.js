/*
 * [114] 二叉树展开为链表
 */

/* 
  给你二叉树的根结点 root ，请你将它展开为一个单链表：

  展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
  展开后的单链表应该与二叉树 先序遍历 顺序相同。
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
var flatten = function(root) {
  let res = [];
  function preOrder(node) {
    if (!node) {
      return;
    }
    res.push(node);
    preOrder(node.left);
    preOrder(node.right);
  }
  preOrder(root);

  for (let i = 1; i < res.length; i++) {
    const prev = res[i - 1];
    const cur = res[i];
    prev.left = null;
    prev.right = cur;
  }
};