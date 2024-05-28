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

// v2
var mergeKLists = function(lists) {
  if (lists.length === 0) {
    return null;
  }
  return mergeLists(lists, 0, lists.length - 1);
}

function mergeLists(lists, start, end) {
  // 归并排序的思路，递归拆分，最终每次进行mergeTwoLists
  if (start === end) {
    return lists[start]; // 原子项，拆分的最终结果。也是递归的起点。
  }
  const mid = start + ((end - start) >> 1); // 这里不用 (start + end) >> 1
  const leftList = mergeLists(lists, start, mid);
  const rightList = mergeLists(lists, mid + 1, end);
  return mergeTwoLists(leftList, rightList);
}

function mergeTwoLists (list1, list2) {
  const dummy = new ListNode();
  let cur = dummy;
  while (list1 && list2) {
    if (list1.val < list2.val) {
      cur.next = list1;
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    cur = cur.next;
  }
  cur.next = list1 || list2;
  return dummy.next;
}

// v3 最纯正的方式，但是会超时，一个用例都过不了。
var mergeKLists = function(lists) {
  const dummy = new ListNode();
  let head = dummy;
  while (lists.some(head => head !== null)) {
    let minNode = new ListNode(Infinity);
    for (const first of lists) {
      if (first && first.val < minNode.val) {
        minNode = first;
      }
    }
    head.next = minNode;
    minNode = minNode.next;
    head = head.next;
  }
  return dummy.next;
}