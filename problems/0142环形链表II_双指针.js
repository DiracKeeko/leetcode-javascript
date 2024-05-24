/*
 * [142] 环形链表 II
 */

/* 
给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
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
 * @return {ListNode}
 */

// 双指针算法的空间复杂度是 O(1);
var detectCycle = function(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      let cur = head; // 相遇后 从A, B各自发出指针
      while (cur !== fast) {
        cur = cur.next;
        fast = fast.next;
      }
      return cur;
    }
  }
  return null;
};


  /* 
    在快慢指针相遇的时候
    从快慢指针相遇的节点A，以及head节点B 各自发出一个指针，两个指针每次都走一步。
    这两个指针相遇的节点，就是入环节点。

    // 解析看代码随想录
    https://programmercarl.com/0142.%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8II.html#思路

    x = n (y + z) - y 
    上面的公式也可以转化为
    x = (n - 1) (y + z) + z   
    
    =>  x = z
  */