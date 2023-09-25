/* 
  [199] 二叉树的右视图
  给定一个二叉树的 根节点 root，想象自己站在它的右侧，
  按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

  输入: [1,2,3,null,5,null,4]
  输出: [1,3,4]
*/

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  const res = [];
  if (!root) {
    return res;
  }

  let queue = [root];
  while (queue.length) {
    const lastNode = queue[queue.length - 1];
    res.push(lastNode.val); // 在这里把queue的最后一个val放进res中

    const level = [];
    for (let i = 0; i < queue.length; i++) {
      const curNode = queue[i];
      curNode.left && level.push(curNode.left);
      curNode.right && level.push(curNode.right);
    }
    queue = level;
  }
  return res;
};