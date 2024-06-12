/*
 * [108] 将有序数组转换为二叉搜索树
 */

/* 
  给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。

  高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 的二叉树。
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  if (!nums.length) {
    return null;
  }
  const midIndex = nums.length >> 1;
  const root = new TreeNode(nums[midIndex]);
  root.left = sortedArrayToBST(nums.slice(0, midIndex));
  root.right = sortedArrayToBST(nums.slice(midIndex + 1));
  return root;
};

// v2 不改变数组，使用指针的方式 (效率很高)
var sortedArrayToBST = function(nums) {
  
  function recursion(l, r) {
    if (l > r) {
      return null;
    }
    const mid = l + (r - l >> 1);
    const root = new TreeNode(nums[mid]);
    root.left = recursion(l, mid - 1);
    root.right = recursion(mid + 1, r);
    return root;
  }
  
  return recursion(0, nums.length - 1);
};

/* 
v2
31/31 cases passed (56 ms)
Your runtime beats 96.35 % of javascript submissions
Your memory usage beats 87.37 % of javascript submissions (52.6 MB)
*/