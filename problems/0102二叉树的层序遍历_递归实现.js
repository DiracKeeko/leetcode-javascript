var levelOrder = function (root) {
  let res = [];
  function preOrder(node, deep) {
    if (node === null) {
      return;
    }
    if (res[deep] === undefined) {
      res[deep] = [];
    }
    res[deep].push(node.val);
    preOrder(node.left, deep + 1);
    preOrder(node.right, deep + 1);
  }
  preOrder(root, 0);
  return res;
};
