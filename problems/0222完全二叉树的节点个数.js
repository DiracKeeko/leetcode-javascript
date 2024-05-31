/*
 * [222] 完全二叉树的节点个数
 */

/* 
给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。

完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2h 个节点。

*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var countNodes = function(root) {
  let res = 0;
  function getNum(node) {
    if (!node) {
      return;
    }
    res += 1;
    node.left && getNum(node.left);
    node.right && getNum(node.right);
  }
  getNum(root);
  return res;
};


// v2 迭代 (层序)
var countNodes = function(root) {
  if (!root) {
    return 0;
  }

  let res = 0;
  let arr = [root];
  while (arr.length) {
    res += arr.length;
    const n = [];
    for (const node of arr) {
      node.left && n.push(node.left);
      node.right && n.push(node.right);
    }
    arr = n;
  }
  return res;
};
