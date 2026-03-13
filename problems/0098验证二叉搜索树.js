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
var isValidBST = function (root) {
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

// v2
/* 
  注意：不能单纯的比较左节点小于中间节点，右节点大于中间节点就完事了。
*/
var isValidBST = function (root) {
  return validate(root, -Infinity, Infinity);

  /**
   * @param {TreeNode} node 当前节点
   * @param {number} min 允许的最小值
   * @param {number} max 允许的最大值
   */
  function validate(node, min, max) {
    if (node === null) {
      return true;
    }

    // 2. 检查当前节点是否在允许的范围内
    // 注意：BST 要求是严格大于/小于，不能等于
    if (node.val <= min || node.val >= max) {
      return false;
    } // 只有 min < node.val < max 返回 true

    // 3. 递归检查左右子树
    // 左子树的最大值不能超过当前节点值
    // 右子树的最小值不能低于当前节点值
    return (
      validate(node.left, min, node.val) && validate(node.right, node.val, max)
    );
  }
};
/* 
v2
Accepted
86/86 cases passed (1 ms)
Your runtime beats 86.96 % of javascript submissions
Your memory usage beats 55.71 % of javascript submissions (58.2 MB)
*/
