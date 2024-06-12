/*
 * [450] 删除二叉搜索树中的节点
 */

/* 
  给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。
  
  返回二叉搜索树（有可能被更新）的根节点的引用。
*/

/* 
  解析
  https://programmercarl.com/0450.%E5%88%A0%E9%99%A4%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B9.html#思路
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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
  if (!root) {
    return null;
  }

  if (key > root.val) {
    root.right = deleteNode(root.right, key);
    return root;
  }
  if (key < root.val) {
    root.left = deleteNode(root.left, key);
    return root;
  }

  // 下面都是 key === root.val 的情况
  if (!root.left && !root.right) {
    // 1.无子节点，删除root本身
    return null;
  }
  if (!root.left) {
    // 2.没有左节点，直接使用右节点补位
    return root.right;
  }
  if (!root.right) {
    // 3.没有右节点，使用左节点补位
    return root.left;
  }

  // 4.左右节点都存在
  // 将root左子树头结点（左孩子）放到root的右子树的最左面节点的左孩子上，返回删除节点右孩子为新的根节点。
  let rightNode = root.right;
  while (rightNode.left) {
    rightNode = rightNode.left;
  }
  rightNode.left = root.left;
  return root.right;
};