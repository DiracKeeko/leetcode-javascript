/*
 * [206] 反转链表
 */
/* 
  给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
*/

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
var reverseList = function(head) {
  const sentry = new ListNode();
  while (head) {
    const nextNode = sentry.next;
    sentry.next = head;
    head = head.next;
    sentry.next.next = nextNode;
  }
  return sentry.next;
};

// 上下是两种不同的实现
var reverseList = function(head) {
  const dummy = new ListNode(); // 关键点在于不能 new ListNode(0, head); 这个会给自己找麻烦
  while (head) {
    const headNext = head.next;
    head.next = dummy.next;
    dummy.next = head;
    head = headNext;
  }
  return dummy.next;
};