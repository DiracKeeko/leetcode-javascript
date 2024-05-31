/*
 * [111] 二叉树的最小深度
 */

/* 
给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

说明：叶子节点是指没有子节点的节点。
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
 * @return {number}
 */

var minDepth = function(root) {
  if (!root) {
    return 0;
  }
  if (!root.left && !root.right) {
    return 1;
  }
  if (!root.left) {
    return minDepth(root.right) + 1;
  }
  if (!root.right) {
    return minDepth(root.left) + 1;
  }
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

var minDepthPreVersion = function(root) {
  if (!root) {
    return 0;
  }
  if (!root.left && !root.right) {
    return 1;
  }
  let res = Infinity;
  function walk(node, curDeep) {
    if (!node.left && !node.right) {
      res = Math.min(res, curDeep);
      return;
    }
    node.left && walk(node.left, curDeep + 1);
    node.right && walk(node.right, curDeep + 1);
  }
  walk(root, 1);
  return res;
};

// ↓ v4 迭代实现 容易理解
var minDepth = function(root) {
  if (!root) {
    return 0;
  }

  let arr = [root];
  let res = 0;
  while (arr.length) {
    res += 1;
    let n = [];
    for (const node of arr) {
      if (!node.left && !node.right) {
        return res;
      }
      node.left && n.push(node.left);
      node.right && n.push(node.right);
    }
    arr = n;
  }
};

// ↓ 迭代实现 这种可以
var minDepth = function(root) {
  if (!root) {
    return 0;
  }

  let depth = 1;
  let queue = [root];

  while (queue.length) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // 如果遇到叶子节点，返回当前深度
      if (!node.left && !node.right) {
        return depth;
      }

      // 将子节点加入队列
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    // 每遍历一层深度加1
    depth += 1;
  }
};