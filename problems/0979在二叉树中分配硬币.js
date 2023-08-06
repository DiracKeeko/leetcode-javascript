/* 
给你一个有 n 个结点的二叉树的根结点 root ，
其中树中每个结点 node 都对应有 node.val 枚硬币。整棵树上一共有 n 枚硬币。

在一次移动中，我们可以选择两个相邻的结点，
然后将一枚硬币从其中一个结点移动到另一个结点。移动可以是从父结点到子结点，或者从子结点移动到父结点。

返回使每个结点上 只有 一枚硬币所需的 最少 移动次数。
*/

var distributeCoins = function(root) {
  let res = 0;
  function preOrder(node) {
    if (node === null) {
      return 0;
    }
    const l = preOrder(node.left);
    const r = preOrder(node.right);
    const step = l + r + node.val - 1;
    res += Math.abs(step);
    return step;
  }
  preOrder(root);
  return res;
};