/*
 * [968] 监控二叉树
 */

/* 
  给定一个二叉树，我们在树的节点上安装摄像头。

  节点上的每个摄影头都可以监视其父对象、自身及其直接子对象。

  计算监控树的所有节点所需的最小摄像头数量。
*/

/* 
  分析思路，要尽可能让叶子节点的父节点放置摄像头, 再从底向上推导出上层节点的摄像头放置状态。
  
  ## 左(节点) - 右(节点) 根节点  ->  后序遍历

  ## 先定义每个节点的可能状态
  0 无覆盖
  1 有摄像头
  2 被摄像头覆盖

  注意: null节点的状态是2

  ## 通过左右子节点的状态向上推导

  状态转移的可能情况:        |  除了左侧的三种转移状态还有一种特殊情况
     0       1       2     | root 0    遍历完成之后root依然是状态0，则应该给root处再放一个摄像头
    / \     / \     / \    |     / \
   2   2   0       1       |    2   2

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
var minCameraCover = function(root) {
  let res = 0;
  const rootState = postOrder(root);
  if (rootState === 0) {
    res += 1;
  }
  return res;

  function postOrder(node) {
    if (!node) {
      return 2;
    }
    let l = postOrder(node.left);
    let r = postOrder(node.right);
    let state;
    if (l === 2 && r === 2) {
      state = 0;
    } else if (l === 0 || r === 0) {
      res += 1;
      state = 1;
    } else if (l === 1 || r === 1) {
      state = 2;
    }
    return state;
  }

};

// v2 === v1
var minCameraCover = function(root) {
  let count = 0;

  const rootState = postOrder(root);
  if (rootState === 0) {
    count += 1;
  }
  return count;

  function postOrder(node) {
    if (!node) {
      return 2;
    }

    const l = postOrder(node.left);
    const r = postOrder(node.right);
    if (l === 2 && r === 2) {
      return 0;
    }
    if (l === 0 || r === 0) {
      count += 1;
      return 1;
    }
    if (l === 1 || r === 1) {
      return 2;
    }
  }
};