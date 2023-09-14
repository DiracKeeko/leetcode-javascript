/*
 * [92] 反转链表 II
 */

/* 
给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
*/

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  let sentry = new ListNode();
  sentry.next = head;

  let fast = sentry;
  let slow = sentry;

  let preMove = right - left + 1; // 为了得到left位置的上一个节点，让right多走一步
  while (preMove) {
    fast = fast.next;
    preMove -= 1;
  }

  let secondMove = left - 1; // right初始位置是1的位置
  while (secondMove) {
    fast = fast.next;
    slow = slow.next;
    secondMove -= 1;
  }

  const breakPrevNode = slow;
  const breakNextNode = fast.next;

  let dummy = null;
  slow = slow.next;
  const tailNode = slow; // 反转后的尾节点
  // while (slow !== fast.next) { // 这种写法不行
  while (slow !== breakNextNode) {
    const nextNode = slow.next;
    slow.next = dummy;
    dummy = slow;
    slow = nextNode;
  }

  breakPrevNode.next = dummy;
  tailNode.next = breakNextNode;

  return sentry.next;
};
