/*
 * [654] 最大二叉树
 */

/* 
给定一个不重复的整数数组 nums 。 

最大二叉树 可以用下面的算法从 nums 递归地构建:
  创建一个根节点，其值为 nums 中的最大值。
  递归地在最大值 左边 的 子数组前缀上 构建左子树。
  递归地在最大值 右边 的 子数组后缀上 构建右子树。
  返回 nums 构建的 最大二叉树 。
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
  if (!nums.length) {
    return null;
  }
  const maxVal = Math.max(...nums);
  const maxIndex = nums.indexOf(maxVal);
  const root = new TreeNode(maxVal);
  root.left = constructMaximumBinaryTree(nums.slice(0, maxIndex));
  root.right = constructMaximumBinaryTree(nums.slice(maxIndex + 1));
  return root;
};

// v2 同样的思路 更精简的实现
var constructMaximumBinaryTree = function(nums) {
  if (!nums.length) {
    return null;
  }

  const max = Math.max(...nums);
  const i = nums.indexOf(max);
  const leftNode = constructMaximumBinaryTree(nums.slice(0, i));
  const rightNode = constructMaximumBinaryTree(nums.slice(i + 1));
  const node = new TreeNode(max, leftNode, rightNode);

  return node;
};