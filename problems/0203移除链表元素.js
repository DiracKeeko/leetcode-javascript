/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

// 0203移除链表元素
// 给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点。
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  const newHead = new ListNode(0, head);
  let curNode = newHead;
  while(curNode.next) {
    if (curNode.next.val === val) {
      curNode.next = curNode.next.next;
    } else {
      curNode = curNode.next;
    }
  }
  return newHead.next;
};