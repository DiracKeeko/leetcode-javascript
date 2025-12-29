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

// v3 相比于v2更好理解 快指针 需要走n步，最后
// 如倒数第二个节点，实际上快指针先走两步，等到快指针
var removeNthFromEnd = function(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy;
  let step = 0;
  while (step < n) {
    fast = fast.next;
    step += 1;
  }
  let slow = dummy;
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
};

/* 
208/208 cases passed (0 ms)
Your runtime beats 100 % of javascript submissions
Your memory usage beats 98.59 % of javascript submissions (54.5 MB)
耗时 0:10:23
*/