/*
 * [109] 有序链表转换二叉搜索树
 */

/* 
  给定一个单链表的头节点  head ，其中的元素 按升序排序 ，将其转换为高度平衡的二叉搜索树。
  本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差不超过 1。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
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
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  if (!head) {
    return null;
  }

  const arr = [];
  let cur = head;
  while (cur) {
    arr.push(cur.val);
    cur = cur.next;
  }

  return sortedArrayToBST(arr);
};

var sortedArrayToBST = function(nums) {
  if (!nums.length) {
    return null;
  }
  const midIndex = nums.length >> 1;
  const root = new TreeNode(nums[midIndex]);
  root.left = sortedArrayToBST(nums.slice(0, midIndex));
  root.right = sortedArrayToBST(nums.slice(midIndex + 1));
  return root;
};


// 直接递归操作链表来实现
var sortedListToBST = function(head) {
  if (!head) {
    return null;
  }

  function traverse(head, tail) {
    if (head === tail) {
      return null;
    }
    let fast = head;
    let slow = head;
    while (fast !== tail && fast.next !== tail) {
      fast = fast.next.next;
      slow = slow.next;
    }

    const root = new TreeNode(slow.val);
    root.left = traverse(head, slow);
    root.right = traverse(slow.next, tail);
    return root;
  }

  return traverse(head, null);
};