/*
 * [700] 二叉搜索树中的搜索
 */

/*
  给定二叉搜索树（BST）的根节点 root 和一个整数值 val。
  你需要在 BST 中找到节点值等于 val 的节点。 返回以该节点为根的子树。 如果节点不存在，则返回 null 。
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
 * @param {number} val
 * @return {TreeNode}
 */
var searchBST = function(root, val) {
  const nodeArr = [];
  const valArr = [];
  function inOrder(node) {
    if (!node) {
      return;
    }
    inOrder(node.left);
    nodeArr.push(node);
    valArr.push(node.val);
    inOrder(node.right);
  }
  inOrder(root);
  if (valArr.includes(val)) {
    const index = valArr.indexOf(val);
    return nodeArr[index];
  }
  return null;
};

// ↓ 一个类似二分的思路 这个解法效率很高
var searchBST = function(root, val) {
  if (!root) {
    return null;
  }

  if (root.val === val) {
    return root;
  } else if (root.val > val) {
    return searchBST(root.left, val);
  } else if (root.val < val) {
    return searchBST(root.right, val);
  }
};