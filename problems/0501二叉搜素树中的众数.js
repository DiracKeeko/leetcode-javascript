/*
 * [501] 二叉搜索树中的众数
 */

/* 
给你一个含重复值的二叉搜索树（BST）的根节点 root ，找出并返回 BST 中的所有 众数（即，出现频率最高的元素）。

如果树中有不止一个众数，可以按 任意顺序 返回。

假定 BST 满足如下定义：

  结点左子树中所含节点的值 小于等于 当前节点的值
  结点右子树中所含节点的值 大于等于 当前节点的值
  左子树和右子树都是二叉搜索树
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
 * @return {number[]}
 */
var findMode = function(root) {
  const arr = [];
  function inorder(root) {
    if (!root) {
      return;
    }
    inorder(root.left);
    arr.push(root.val);
    inorder(root.right);
  }
  inorder(root);

  return getModeArr(arr);
};

function getModeArr(sortedArray) {
  const modeMap = {};

  let currentCount = 1;
  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i] === sortedArray[i - 1]) {
      currentCount += 1;
    } else {
      modeMap[currentCount] = modeMap[currentCount] || [];
      modeMap[currentCount].push(sortedArray[i - 1]);
      currentCount = 1; // reset the count for the new element
    }
  }

  // 循环结束之后，检查最后一个元素
  modeMap[currentCount] = modeMap[currentCount] || [];
  modeMap[currentCount].push(sortedArray[sortedArray.length - 1]);
  
  const countArr = Object.keys(modeMap);
  const maxCount = Math.max(...countArr);

  return modeMap[maxCount];
}