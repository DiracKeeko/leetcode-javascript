/*
 * @lc app=leetcode.cn id=662 lang=javascript
 * @lcpr version=21909
 *
 * [662] 二叉树最大宽度
 */

// @lc code=start
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
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  const arr = [];
  const mod = 10000000007; // 取模的基数
  function getNodeIndex(root, deep, index) {
    if (root === null) return;
    if (!arr[deep]) arr[deep] = [];
    arr[deep].push(index);
    getNodeIndex(root.left, deep + 1, (index * 2 - 1) % mod);
    getNodeIndex(root.right, deep + 1, (index * 2) % mod);
  }
  getNodeIndex(root, 0, 1);

  let max = 1;
  for (let i = 1; i < arr.length; i++) { 
    if (arr[i].length > 1) {
      max = Math.max(max, arr[i].pop() - arr[i][0] + 1);
    }
  }
  return max;
};
