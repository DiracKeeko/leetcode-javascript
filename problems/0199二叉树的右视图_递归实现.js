/* 
  [199] 二叉树的右视图
  给定一个二叉树的 根节点 root，想象自己站在它的右侧，
  按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

  输入: [1,2,3,null,5,null,4]
  输出: [1,3,4]
*/

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  const res = [];
  function preOrder(node, deep) {
    if (node === null) {
      return;
    }
    if (!res[deep]) {
      res[deep] = [];
    }
    res[deep].push(node.val);
    preOrder(node.left, deep + 1);
    preOrder(node.right, deep + 1);
  }
  preOrder(root, 0);
  return res.map((item) => item[item.length - 1]);
};
/* 
216/216 cases passed (56 ms)
Your runtime beats 94.02 % of javascript submissions
Your memory usage beats 11.36 % of javascript submissions (42.9 MB)
*/

var rightSideView02 = function (root) {
  const res = [];
  function preOrder(node, deep) {
    if (node === null) {
      return;
    }
    res[deep] = node.val;
    preOrder(node.left, deep + 1);
    preOrder(node.right, deep + 1);
  }
  preOrder(root, 0);
  return res;
};
/* 
216/216 cases passed (72 ms)
Your runtime beats 26.98 % of javascript submissions
Your memory usage beats 79.11 % of javascript submissions (42.5 MB)
*/