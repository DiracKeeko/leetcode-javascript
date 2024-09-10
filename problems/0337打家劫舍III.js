/*
 * [337] 打家劫舍 III
 */

/* 
  小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为 root 。

  除了 root 之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 如果 两个直接相连的房子在同一天晚上被打劫 ，房屋将自动报警。

  给定二叉树的 root 。返回 在不触动警报的情况下 ，小偷能够盗取的最高金额 。
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/* 
  思路1：只能隔层取数，那么用先序遍历，求得二叉树的每层之和，存入一个数组中,再对数组进行rob 
    思路1是错误思路，因为不全是隔层取，有些分支可以跳层取。

  思路2：在二叉树递归时直接推导
    后序遍历，每次后序遍历返回的结果[r0, r1] 分别代表当前节点不选中与选中情况下的最大值。
    [不选中当前节点, 选中当前节点]
*/

/**
 * @param {TreeNode} root
 * @return {number}
 */

// final
var rob = function(root) {
  return Math.max(...postOrder(root));

  function postOrder(node) {
    if (!node) {
      return [0, 0];
    }
    const [l0, l1] = postOrder(node.left);
    const [r0, r1] = postOrder(node.right);

    // 不偷当前节点，左右子节点都可以偷或不偷，取最大值
    const cur0 = Math.max(l0, l1) + Math.max(r0, r1);

    // 偷当前节点，左右子节点只能不偷
    const cur1 = l0 + r0 + node.val;

    return [cur0, cur1];
  }
}

// v1 思路正确，但是效率低，会超时 (重复计算了很多值)
var rob = function(root) {
  if (!root) {
    return 0;
  }
  if (!root.left && !root.right) {
    return root.val;
  }

  let chooseMax = root.val; // 选中当前val
  if (root.left) {
    chooseMax = chooseMax + rob(root.left.left) + rob(root.left.right); // 添加隔层的val
  }
  if (root.right) {
    chooseMax = chooseMax + rob(root.right.left) + rob(root.right.right); // 继续添加隔层的val
  }
  const subMax = rob(root.left) + rob(root.right);
  return Math.max(subMax, chooseMax);
};

// robVersion1 -> 思路1，不能全过
/* 
  [2,1,3,null,4]

    Answer 6
    Expected Answer 7
*/
var robVersion1 = function(root) {
  const arr = [];
  preOrder(root, 0);
  return robArr(arr);

  function preOrder(node, layer) {
    if (!node) {
      return;
    }
    if (!arr[layer]) {
      arr[layer] = 0;
    }
    arr[layer] += node.val;
    preOrder(node.left, layer + 1);
    preOrder(node.right, layer + 1);
  }

  function robArr(nums) {
    const dp = [nums[0], Math.max(nums[0], nums[1])];
    for (let i = 2; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[nums.length - 1];
  };
};