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

// ↓ 迭代实现  这个测试用例不通过 [1,2,3,4,5]  needReview
var minDepth = function(root) {
  if (!root) {
    return 0;
  }

  let res = 1;
  const queue = [root];
  while (queue.length) {
    const level = [];
    for (let i = 0; i < queue.length; i++) {
      // const node = queue.shift(); // 这行代码有问题, queue的长度改变，会影响上一行queue.length 这个for循环的终止条件，让queue里的节点无法遍历完成
      const node = queue[i]; // 换成这行，或者把for循环换成while循环
      if (!node.left && !node.right) {
        return res;
      }
      node.left && level.push(node.left);
      node.right && level.push(node.right);
    }
    res += 1;
    queue = [...level];
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