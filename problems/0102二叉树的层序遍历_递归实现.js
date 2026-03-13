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

// 第二版实现 精简了判空代码 主体逻辑未变
var levelOrder = function(root) {
  const res = [];
  preOrder(root, 0);
  return res;

  function preOrder(node, deep) {
    if (!node) {
      return;
    }
    res[deep] = res[deep] || [];
    res[deep].push(node.val);
    node.left && preOrder(node.left, deep + 1);
    node.right && preOrder(node.right, deep + 1);
  }
};