/* 
给你一棵二叉树的根节点 root ，返回树的 最大宽度 。

题目数据保证答案将会在  32 位 带符号整数范围内。
*/

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

// 树的 最大宽度 是所有层中最大的 宽度 。
/*
每一层的 宽度 被定义为该层最左和最右的非空节点（即，两个端点）之间的长度。将这个二叉树视作与满二叉树结构相同，两端点间会出现一些延伸到这一层的 null 节点，这些 null 节点也计入长度。
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
