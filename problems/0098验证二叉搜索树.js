/*
 * [98] 验证二叉搜索树
 */

/* 
给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

有效 二叉搜索树定义如下：

  节点的左子树只包含 小于 当前节点的数。
  节点的右子树只包含 大于 当前节点的数。
  所有左子树和右子树自身必须也是二叉搜索树。
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
 * @return {boolean}
 */

// 解题思路：用中序遍历去遍历二叉搜索树，会得到一个从小到大排列的数组
var isValidBST = function(root) {
  if (!root) {
    return false;
  }

  const valArr = [];
  function traverse(node) {
    if (!node) {
      return;
    }
    traverse(node.left);
    valArr.push(node.val);
    traverse(node.right);
  }
  traverse(root);

  for (let i = 1; i < valArr.length; i++) {
    const prevVal = valArr[i - 1];
    const curVal = valArr[i];
    if (prevVal >= curVal) {
      return false;
    }
  }
  return true;
};

// v2 这种方法有问题，不能验证树的多层之间的大小关系(只能验证到上下两层)
/* 
  注意：不能单纯的比较左节点小于中间节点，右节点大于中间节点就完事了。
*/
var isValidBST = function(root) {
  const res = [];
  function recursion(root) {
    const l = root.left ? root.left.val : -Infinity;
    const r = root.right ? root.right.val : Infinity;
    const cur = root.val;
    if (l < cur && cur < r) {
      res.push(true);
      root.left && recursion(root.left);
      root.right && recursion(root.right);
    } else {
      res.push(false);
    }
  }
  recursion(root);
  return res.every(item => item);
};