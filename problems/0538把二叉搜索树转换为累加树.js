/*
 * [538] 把二叉搜索树转换为累加树

    给出二叉 搜索 树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node 的新值等于原树中大于或等于 node.val 的值之和。
 */

/* 
解析 
(https://programmercarl.com/0538.%E6%8A%8A%E4%BA%8C%E5%8F%89%E6%90%9C%E7%B4%A2%E6%A0%91%E8%BD%AC%E6%8D%A2%E4%B8%BA%E7%B4%AF%E5%8A%A0%E6%A0%91.html#算法公开课)
  这是一棵树，看起来有点别扭，
  换一个角度来看，这就是一个有序数组[2, 5, 13]，求从后到前的累加数组，其结果是[20, 18, 13]

  为什么变成数组就是感觉简单了呢？
  因为数组大家都知道怎么遍历啊，从后向前，挨个累加就完事了，这换成了二叉搜索树，看起来就别扭了一些是不是。

  那么知道如何遍历这个二叉树，也就迎刃而解了，从树中可以看出累加的顺序是右中左，
  所以我们需要反中序遍历这个二叉树，然后顺序累加就可以了。 (右 中 左)
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
 * @return {TreeNode}
 */

// 递归，按照反中序遍历 (右 中 左) 
var convertBST = function(root) {
  let pre = 0;
  function reverseInOrder(root) {
    if (!root) {
      return;
    }
    reverseInOrder(root.right);
    root.val += pre;
    pre = root.val;
    reverseInOrder(root.left);
  }

  reverseInOrder(root);
  return root;
};