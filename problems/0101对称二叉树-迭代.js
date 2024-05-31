/*
 * [101] 对称二叉树
 * 
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 */

var isSymmetric = function(root) {
  let a = root.left;
  let b = root.right;
  let stack1 = [];
  let stack2 = [];
  while (a || stack1.length) {
    while (a) {
      if (b === null || a.val !== b.val) {
        return false;
      }
      stack1.push(a);
      stack2.push(b);
      a = a.left;
      b = b.right;
    }
    if (b) {
      return false;
    }
    a = stack1.pop().right;
    b = stack2.pop().left;
  }
  return b === null;
};

// v2 ↓ 更好理解
var isSymmetric = function(root) {
  if (!root) {
    return true;
  }

  let l = [root.left];
  let r = [root.right];
  while (l.length) {
    if (l.length !== r.length) {
      return false;
    }
    if (l.every(item => item === null) && r.every(item => item === null)) {
      return true;
    }
    const ln = []; // l next
    const rn = [];
    for (let i = 0; i < l.length; i++) {
      if (l[i] === null && r[i] === null) {
        continue;
      }
      if (l[i] && !r[i]) {
        return false;
      }
      if (!l[i] && r[i]) {
        return false;
      }
      if (l[i].val !== r[i].val) {
        return false;
      }
      l[i] && ln.push(l[i].left, l[i].right);
      r[i] && rn.push(r[i].right, r[i].left);
    }
    l = ln;
    r = rn;
  }
};

// ↓ 下面这种不分左右的做法是一种错误的做法
// 它无法区分这种情况
/* 
        1
    2       2
  3   3
*/
var isSymmetric = function(root) {
  if (!root) {
    return true;
  }

  let cur = [root.left, root.right];
  while (cur.length) {
    let next = [];
    const first = cur.shift();
    const last = cur.pop();
    if (first === null && last === null) {
      continue;
    }
    if (!first && last) {
      return false;
    }
    if (first && !last) {
      return false;
    }
    if (first.val !== last.val) {
      return false;
    }
    first && next.unshift(first.left, first.right);
    last && next.push(last.left, last.right);
    if (cur.length === 0 && next.length !== 0) {
      cur = next;
    }
  }
  return true;
};