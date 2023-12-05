/*
 * [23] 合并 K 个升序链表
 */

/* 
  给你一个链表数组，每个链表都已经按升序排列。

  请你将所有链表合并到一个升序链表中，返回合并后的链表。
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

// v1 list -> arr -> merge -> sort -> list
var mergeKLists = function(lists) {
  const arr = [];
  for (let list of lists) {
    while (list) {
      arr.push(list.val);
      list = list.next;
    }
  }
  arr.sort((a, b) => a - b);
  const head = new ListNode();
  let cur = head;
  for (const val of arr) {
    const node = new ListNode(val);
    cur.next = node;
    cur = cur.next;
  }
  return head.next;
};

/* 
v1
  133/133 cases passed (84 ms)
  Your runtime beats 85.5 % of javascript submissions
  Your memory usage beats 93.53 % of javascript submissions (45.6 MB)
v1 并不是这题要考察的方向，是取巧
 */

