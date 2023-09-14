/*
 * [234] 回文链表
 */
/* 
给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
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
 * @return {boolean}
 */

// 思路是利用快慢双指针将链表的前半部分反转，再将反转的前半部分链表和后半部分比较
var isPalindrome = function(head) {
  let fast = head;
  let slow = head;

  // 在原地进行链表反转 (实际上是以dummy为头结点 创建了新的链表)
  let dummy = null;

  while (fast && fast.next) {
    fast = fast.next.next;

    const nextNode = slow.next;
    slow.next = dummy;
    dummy = slow;
    slow = nextNode;
  }

  if (fast) {
    // 奇数长度的链表  1 2 3 2 1  则slow向前一步 从3 -> 2
    slow = slow.next;
  }

  while (slow && dummy) {
    if (slow.val !== dummy.val) {
      return false;
    }
    slow = slow.next;
    dummy = dummy.next;
  }
  return true;
};