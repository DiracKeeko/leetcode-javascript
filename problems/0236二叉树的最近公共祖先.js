/*
 * [236] 二叉树的最近公共祖先
 */

/* 
  给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (root === null) {
    return null; // 其实也是return root;
    // return null 就是没找到 到底了
  }
  if (root === p || root === q) {
    return root;
    // 找到了，找到了自己
  }
  
  /* 
  上面两个if可以精简为一个
  if (root === null || root === p || root === q) {
    return root;
  }
  */
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) {
    // 左右两边都找到了，那说明p和q一个在左边一个在右边，公共祖先就是root
    return root; 
  }
  return left ? left : right;
};