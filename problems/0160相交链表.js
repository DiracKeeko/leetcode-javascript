/*
 * [160] 相交链表
 */

/* 
  给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// v1 用集合set，这是最简单的方式
var getIntersectionNode = function(headA, headB) {
  const nodeSet = new Set();
  while (headA) {
    nodeSet.add(headA);
    headA = headA.next;
  }

  while (headB) {
    if (nodeSet.has(headB)) {
      return headB;
    }
    headB = headB.next;
  }
  return null;
};
/* 
v1
Accepted
41/41 cases passed (80 ms)
Your runtime beats 41.21 % of javascript submissions
Your memory usage beats 5.14 % of javascript submissions (69.7 MB)
*/


// v2
var getIntersectionNode = function(headA, headB) {
  if (!headA && !headB) {
    return null;
  }

  let pa = headA;
  let pb = headB;
  while (pa !== pb) {
    pa = (pa === null) ? headB : pa.next;
    pb = (pb === null) ? headA : pb.next;
  }
  return pa;
};

/* 
Accepted
41/41 cases passed (87 ms)
Your runtime beats 21.72 % of javascript submissions
Your memory usage beats 30.41 % of javascript submissions (66.9 MB)
*/

