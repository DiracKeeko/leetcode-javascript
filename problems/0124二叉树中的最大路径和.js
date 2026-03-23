/* 
[124] 二叉树中的最大路径和
二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。
同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

路径和 是路径中各节点值的总和。

给你一个二叉树的根节点 root ，返回其 最大路径和 。
*/

/* 
核心逻辑：节点的“双重身份”
在递归过程中，对于每一个节点，它其实扮演着两个角色：

作为“最高点（顶点）”：
路径从左子树上来，经过它，再下到右子树去。此时，这条路径就此封口，不能再向上汇报给父节点了。
路径和 = node.val + 左子树贡献 + 右子树贡献。

作为“贡献者（桥梁）”：
它只能选择左子树或右子树中较长的那一根，加上自己，向上汇报给父节点，由父节点去拼更大的路径。
贡献值 = node.val + max(左子树贡献, 右子树贡献)。

关键点：负数处理
如果某棵子树算出来的贡献是负数，我们宁愿舍弃它（即贡献设为 0），也不要把它加进来拖累总和。
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

// v2 仅仅是优化代码结构，语义强化
var maxPathSum = function(root) {
  let maxSum = -Infinity;

  function dfs(node) {
    if (!node) {
      return 0;
    }
    const left = Math.max(dfs(node.left), 0);
    const right = Math.max(dfs(node.right), 0);
    const selfMax = left + right + node.val;
    maxSum = Math.max(maxSum, selfMax);
    return Math.max(left, right, 0) + node.val;
  }

  dfs(root);
  return maxSum;
};

/* 
v2

Accepted
96/96 cases passed (3 ms)
Your runtime beats 32.97 % of javascript submissions
Your memory usage beats 61.85 % of javascript submissions (63.8 MB)
*/