/* 
[124] 二叉树中的最大路径和
二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。
同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

路径和 是路径中各节点值的总和。

给你一个二叉树的根节点 root ，返回其 最大路径和 。
*/

var maxPathSum = function(root) {
  let max = -Infinity; // 最大路径和
  function fundPathSum(node) { // 寻找单边的路径和最大值
    if (node === null) {
      return 0;
    }
    const left = fundPathSum(node.left);
    const right = fundPathSum(node.right);
    max = Math.max(max, node.val + (left > 0 ? left : 0) + (right > 0 ? right : 0));
    return node.val + Math.max(left, right, 0);
  }
  fundPathSum(root);
  return max;
};


