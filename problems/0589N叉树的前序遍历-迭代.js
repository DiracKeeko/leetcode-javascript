/**
 给定一个 n 叉树的根节点  root ，返回 其节点值的 前序遍历 。
  n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。

 */

  /**
 * // Definition for a Node.
 * function Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[]}
 */
var preorder = function(root) {
  const res = [];
  const stack = [];
  // ↓ 不能root === null，因为root可能是undefined
  while(root || stack.length) {
    while(root) {
      res.push(root.val);
      for (let i = root.children.length - 1; i > 0; i--) {
        stack.push(root.children[i]);
      }
      root = root.children[0];
    }
    root = stack.pop();
  }
  return res;
};