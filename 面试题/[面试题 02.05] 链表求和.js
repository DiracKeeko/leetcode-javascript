/*
 * [面试题 02.05] 链表求和
 */

/* 
给定两个用链表表示的整数，每个节点包含一个数位。

这些数位是反向存放的，也就是个位排在链表首部。

编写函数对这两个整数求和，并用链表形式返回结果。
*/

/* 
  输入：(7 -> 1 -> 6) + (5 -> 9 -> 2)，即617 + 295
  输出：2 -> 1 -> 9，即912
*/

// @lcpr-template-start

// @lcpr-template-end
// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let temp = 0;
  const dummy = new ListNode(0);
  let cur = dummy;

  while (l1 && l2) {
    const sum = l1.val + l2.val + temp;
    if (sum >= 10) {
      temp = 1;
      cur.next = new ListNode(sum - 10);
    } else {
      temp = 0;
      cur.next = new ListNode(sum);
    }
    cur = cur.next;
    l1 = l1.next;
    l2 = l2.next;
  }

  let surPlus = l1 || l2;
  while (surPlus) {
    const sum = surPlus.val + temp;
    if (sum >= 10) {
      temp = 1;
      cur.next = new ListNode(sum - 10);
    } else {
      temp = 0;
      cur.next = new ListNode(sum);
    }
    cur = cur.next;
    surPlus = surPlus.next;
  }

  if (temp) {
    cur.next = new ListNode(temp);
  }
  return dummy.next;
};


// v2 更简单的写法
var addTwoNumbers = function(l1, l2) {
  let temp = 0;
  const dummy = new ListNode(0);
  let cur = dummy;

  while (l1 || l2) {
    const v1 = l1 ? l1.val : 0;
    const v2 = l2 ? l2.val : 0;
    const sum = v1 + v2 + temp;
    if (sum >= 10) {
      temp = 1;
      cur.next = new ListNode(sum - 10);
    } else {
      temp = 0;
      cur.next = new ListNode(sum);
    }
    cur = cur.next;
    l1 = l1?.next;
    l2 = l2?.next;
  }

  if (temp) {
    cur.next = new ListNode(temp);
  }
  return dummy.next;
};