/* 
  给你一个链表的头节点 head ，判断链表中是否有环。

  如果链表中存在环，则返回 true ；否则，返回 false 。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  const set = new Set();
  while(head) {
    if (set.has(head)) {
      return true;
    }
    set.add(head);
    head = head.next;
  }
  return false;
};