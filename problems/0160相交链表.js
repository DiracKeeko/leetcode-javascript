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

// 数组也可以 
// 查看提交结果，用集合set的执行时间，要远小于用数组Arr
// 判定复杂对象，用Set()  set.add(); set.has()
// 题干只要求保持链表结构，因此不需要使用curA
var getIntersectionNode = function(headA, headB) {
  const arr = [];
  let curA = headA; // 不需要使用curA, curB
  while (curA) {
    arr.push(curA);
    curA = curA.next;
  }
  
  let curB = headB;
  while (curB) {
    if (arr.includes(curB)) {
      return curB;
    }
    curB = curB.next;
  }

  return null;
};