/*
 * [235] 二叉搜索树的最近公共祖先
 */

/* 
  给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
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

/* 
  利用好二叉搜索树有序的特点。
  
  从上到下递归，找到第一个node.val出现在 [min, max] 的node
  
  注意:
    必须是第一个node，找到第一个node立马返回，
    符合条件的节点可能有多个，仅有第一个是公共祖先
*/
var lowestCommonAncestor = function(root, p, q) {
  const numArr = [p.val, q.val];
  numArr.sort((a, b) => a - b);
  const [numMin, numMax] = numArr;

  function recursion(root) {
    if (!root) {
      return null;
    }
    const cur = root.val;
    if (numMin <= cur && cur <= numMax) {
      return root;
    }
    if (cur > numMax) {
      return recursion(root.left);
    }
    if (cur < numMin) {
      return recursion(root.right);
    }
  }
  
  return recursion(root);
};