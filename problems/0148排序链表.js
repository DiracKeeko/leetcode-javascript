/*
 * [148] 排序链表
 */

// 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// v1 投机取巧
var sortList = function(head) {
  const arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  arr.sort((a, b) => a - b);
  const dummy = new ListNode();
  let first = dummy;
  for (const item of arr) {
    const newNode = new ListNode(item);
    first.next = newNode;
    first = first.next;
  }
  return dummy.next;
};

/* 
v1
Accepted
30/30 cases passed (34 ms)
Your runtime beats 35.39 % of javascript submissions
Your memory usage beats 7 % of javascript submissions (82.7 MB)
*/

// 进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

// v2 使用归并排序
var sortList = function(head) {
  if (!head || !head.next) {
    return head;
  }
  let fast = head;
  let slow = head;
  let pre = slow;

  while (fast && fast.next) {
    fast = fast.next.next;
    pre = slow;
    slow = slow.next;
  }
  pre.next = null;

  const left = sortList(head);
  const right = sortList(slow);
  return merge(left, right); // 合并有序链表
};

function merge(a, b) {
  const dummy = new ListNode();
  let head = dummy;
  while (a && b) {
    if (a.val < b.val) {
      head.next = a;
      a = a.next;
    } else {
      head.next = b;
      b = b.next;
    }
    head = head.next;
  }
  head.next = a || b;
  return dummy.next;
}

/* 
v2
Accepted
30/30 cases passed (30 ms)
Your runtime beats 52.29 % of javascript submissions
Your memory usage beats 94.27 % of javascript submissions (77.6 MB)
*/