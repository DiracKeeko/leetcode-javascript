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
  function dp(node, level) {
    if (!node) {
      return;
    }
    res[level] = res[level] || [];
    res[level].push(node.val);
    dp(node.left, level + 1);
    dp(node.right, level + 1);
  }
  dp(root, 0);
  return res;
};