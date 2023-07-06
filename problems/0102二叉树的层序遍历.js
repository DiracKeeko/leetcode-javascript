var levelOrder = function(root) {
  if (root === null) {
    return [];
  }
  const res = [];
  const queue = [];
  queue.push(root);
  while(queue.length) {
    const level = [];
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
    res.push(level);
  }
  return res;
};