/*
 * [144] 二叉树的前序遍历
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
 * @return {number[]}
 */

// 前序遍历 -> 遍历顺序 根-左-右 (DLR)
var preorderTraversal = function(root) {
  if (root === null) {
    return [];
  }
  const res = [];
  const stack = [];
  while(root !== null || stack.length) {
    while(root !== null) {
      res.push(root.val);
      stack.push(root);
      root = root.left;
    }
    root = stack.pop().right;
  }
  return res;
};

// ↓ 迭代算法的梳理 这个02版本逻辑更清楚
// 前序遍历 -> 遍历顺序 根-左-右 (DLR)
var preorderTraversal02 = function(root) {
  if (root === null) {
    return [];
  }
  const res = [];
  const stack = [root];
  while(stack.length) {
    const cur = stack.pop();
    res.push(cur.val);

    cur.right && stack.push(cur.right);
    cur.left && stack.push(cur.left);
  }
  return res;
};