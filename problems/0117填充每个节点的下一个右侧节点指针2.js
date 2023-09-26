/*
 * [117] 填充每个节点的下一个右侧节点指针 II
 */

/* 
  填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL 。

  初始状态下，所有 next 指针都被设置为 NULL 。

    进阶：

    你只能使用常量级额外空间。
    使用递归解题也符合要求，本题中递归程序的隐式栈空间不计入额外空间复杂度。

  */

// 116题的实现可以直接复用

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if (!root) {
    return root;
  }

  let queue = [root];
  while (queue.length) {
    const level = [];
    for (let i = 0; i < queue.length; i++) {
      const curNode = queue[i];
      const nextNode = queue[i + 1] || null;
      curNode.next = nextNode;
      curNode.left && level.push(curNode.left);
      curNode.right && level.push(curNode.right);
    }
    queue = level;
  }
  return root;
};