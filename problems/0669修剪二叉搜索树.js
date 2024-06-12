/*
 * [669] 修剪二叉搜索树
 */

/* 
给你二叉搜索树的根节点 root ，同时给定最小边界low 和最大边界 high。通过修剪二叉搜索树，
使得所有节点的值在[low, high]中。

修剪树 不应该 改变保留在树中的元素的相对结构 (即，如果没有被移除，原有的父代子代关系都应当保留)。 可以证明，存在 唯一的答案 。

结果应当返回修剪好的二叉搜索树的新的根节点。
注意，根节点可能会根据给定的边界发生改变。
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
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */

// v1 
var trimBST = function(root, low, high) {
  if (!root) {
    return null;
  }

  if (low <= root.val && root.val <= high) {
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
  }

  // 如果不符合条件，直接删除当前的节点 (返回修剪后的root.left 或者 修剪后的root.right)
  // 这里效率不够高(同时开了两个递归分支)
  return trimBST(root.left, low, high) || trimBST(root.right, low, high);
};


// v2  相比较于v1，增加了递归中的剪枝策略
var trimBST = function(root, low, high) {
  if (!root) {
    return null;
  }

  if (low <= root.val && root.val <= high) {
    root.left = trimBST(root.left, low, high);
    root.right = trimBST(root.right, low, high);
    return root;
  }

  // 如果不符合条件，删除当前的节点 (返回修剪后的root.left 或者 修剪后的root.right)
  // 注：原来也是一个BST，所以是有数值的大小关系的，能做到仅保留一条分支
  if (root.val < low) {
    return trimBST(root.right, low, high);
  }

  if (root.val > high) {
    return trimBST(root.left, low, high)
  }

};