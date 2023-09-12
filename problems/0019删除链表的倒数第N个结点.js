/*
 * [19] 删除链表的倒数第 N 个结点
 */

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  const sentry = new ListNode();
  sentry.next = head;

  head = sentry;

  const orderToNodeMap = {};
  let curOrder = 0;
  while (head) {
    orderToNodeMap[curOrder] = head;
    head = head.next;
    curOrder += 1;
  }

  const prevNode = orderToNodeMap[curOrder - n - 1];
  const nextNode = orderToNodeMap[curOrder - n + 1] || null;
  if (prevNode) {
    prevNode.next = nextNode;
  }

  return sentry.next;
};

// 用双指针, 快指针先走n+1步; 之后快慢指针一起走, 这样快指针走完的时候，慢指针也走到了prevNode的位置
var removeNthFromEnd1 = function(head, n) {
  const sentry = new ListNode(); // const dummy;  const sentinel; 都可以
  sentry.next = head;

  let fast = sentry;
  let slow = sentry;
  let firstMove = n + 1;
  
  while (firstMove) {
    fast = fast.next;
    firstMove -= 1;
  }

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  
  slow.next = slow.next.next;

  return sentry.next;
};