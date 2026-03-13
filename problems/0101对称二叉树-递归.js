/*
 * [101] 对称二叉树
 * 
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 */

// v final
var isSymmetric = function(root) {
  if (!root) {
    return true;
  }
  return check(root.left, root.right);

  function check(a, b) {
    if (a === null && b === null) {
      return true;
    }
    if (a === null || b === null) {
      return false;
    }
    if (a.val !== b.val) {
      return false;
    }
    return check(a.left, b.right) && check(a.right, b.left);
  }
};

/* 
v final

Accepted
200/200 cases passed (0 ms)
Your runtime beats 100 % of javascript submissions
Your memory usage beats 9.07 % of javascript submissions (57.3 MB)
*/

var isSymmetric = function(root) {
  function check(a, b) {
    if (a === null && b === null) {
      return true;
    }
    if (a === null || b === null || a.val !== b.val) {
      return false;
    }
    return check(a.left, b.right) && check(a.right, b.left);
  }
  return check(root.left, root.right);
};

var isSymmetric = function(root) {
  function check(a, b) {
    if (!a && !b) {
      return true;
    }
    if (!a || !b) {
      return false;
    }
    if (a.val !== b.val) {
      return false;
    }
    return check(a.left, b.right) && check(a.right, b.left);
  }
  // ↓ 在这里手动的将输入参数由单个，变为递归所需的两个
  return check(root.left, root.right);
};

// v4 先序遍历 根-左-右 + 根-右-左 转化为数组再比较 而且必须记录null
var isSymmetric = function(root) {

  const arr1 = []
  prePush(root.left);
  const arr2 = [];
  laterPush(root.right);
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;

  function prePush(node) {
    if (!node) {
      arr1.push(null);
      return;
    }
    arr1.push(node.val);
    prePush(node.left);
    prePush(node.right);
  }
  function laterPush(node) {
    if (!node) {
      arr2.push(null);
      return;
    }
    arr2.push(node.val);
    laterPush(node.right);
    laterPush(node.left);
  }
};