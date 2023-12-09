/*
 * [2] 两数相加
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var addTwoNumbers = function(l1, l2) {
  let c = 0;
  const start = new ListNode(0);
  let res = start;
  while (l1 || l2) {
    const a = l1 ? l1.val : 0;
    const b = l2 ? l2.val : 0;
    const sum = a + b + c;
    let remain = sum % 10;
    c = parseInt(sum / 10);
    res.next = new ListNode(remain);
    res = res.next;
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  if (c) {
    res.next = new ListNode(c);
  }
  return start.next;
};

// 千万不要复用l1 或者 l2的Node来自讨苦吃
var addTwoNumbers = function(l1, l2) {
  const dummy = new ListNode(0);
  let cur = dummy;
  let c = 0;
  while (l1 || l2) {
    const a = l1 ? l1.val : 0;
    const b = l2 ? l2.val : 0;
    let sum = a + b + c;
    if (sum >= 10) {
      sum -= 10;
      c = 1;
    } else {
      c = 0;
    }
    cur.next = new ListNode(sum);
    cur = cur.next;
    l1 && (l1 = l1.next);
    l2 && (l2 = l2.next);
  }
  if (c) {
    cur.next = new ListNode(1);
  }
  return dummy.next;
}