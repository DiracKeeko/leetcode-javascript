/*
 * [106] 从中序与后序遍历序列构造二叉树
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  const root = new TreeNode(postorder[postorder.length - 1]);

  function recursion(root, pos, ino) {
    const index = ino.indexOf(root.val);
    const lArr = ino.slice(0, index);
    const rArr = ino.slice(index + 1);

    if (lArr.length) {
      const pl = pos.slice(0, lArr.length);
      root.left = new TreeNode(pl[pl.length - 1]); // 用的是pos截取部分最后一个的值
      recursion(root.left, pl, lArr);
    }
    if (rArr.length) {
      const pr = pos.slice(lArr.length, pos.length - 1); // 注意这里的pr截取范围
      root.right = new TreeNode(pr[pr.length - 1]);
      recursion(root.right, pr, rArr);
    }
  }

  recursion(root, postorder, inorder);
  return root;
};