/*
 * [92] 反转链表 II
 */

/* 
给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
*/

/* 
  输入：head = [1,2,3,4,5], left = 2, right = 4
  输出：[1,4,3,2,5]

  输入：head = [5], left = 1, right = 1
  输出：[5]
*/


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */

// ↓ 第2版实现  优先看第3版实现
var reverseBetween = function (head, left, right) {
  let dummy = new ListNode();
  dummy.next = head;

  let temp = dummy;
  // temp移动到left位置的prev位置
  for (let i = 0; i < left - 1; i++) {
    temp = temp.next;
  }

  let prev = temp.next; // left 位置的节点
  let cur = prev.next; // left 位置的下一节点。在下方的for循环完成之后，最终会变为right位置的节点
  for (let j = 0; j < right - left; j++) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  temp.next.next = cur;
  temp.next = prev;
  
  return dummy.next;
}

// ↓ 第1版实现
var reverseBetweenFirstVersion = function (head, left, right) {
  let sentry = new ListNode();
  sentry.next = head;

  let fast = sentry;
  let slow = sentry;

  let preMove = right - left + 1; // 为了得到left位置的上一个节点，让right多走一步
  while (preMove) {
    fast = fast.next;
    preMove -= 1;
  }

  let secondMove = left - 1; // right初始位置是1的位置
  while (secondMove) {
    fast = fast.next;
    slow = slow.next;
    secondMove -= 1;
  }

  const breakPrevNode = slow;
  const breakNextNode = fast.next;

  let dummy = null;
  slow = slow.next;
  const tailNode = slow; // 反转后的尾节点
  // while (slow !== fast.next) { // 这种写法不行
  while (slow !== breakNextNode) {
    const nextNode = slow.next;
    slow.next = dummy;
    dummy = slow;
    slow = nextNode;
  }

  breakPrevNode.next = dummy;
  tailNode.next = breakNextNode;

  return sentry.next;
};

// 第3版实现 优先看这个
// 固定pin, 调整 left 后面的节点
/* 
 pin
  1 2 3 4 5
    
     cur      cur的位置就是left位置
  1 3 2 4 5

       cur    cur不需要做 cur = cur.next操作
  1 4 3 2 5
*/
var reverseBetween = function(head, left, right) {
  const dummy = new ListNode(0, head);
  let cur = dummy;

  let preCount = left - 1;
  while (preCount) {
    cur = cur.next;
    preCount -= 1;
  }
  const pin = cur; // 钉住头位置
  cur = cur.next; // 移动到开始位置 left位置

  let reverseCount = right - left;
  while (reverseCount) {
    const pinNext = pin.next;
    pin.next = cur.next;
    cur.next = cur.next.next;
    pin.next.next = pinNext;
    reverseCount -= 1;
  }
  return dummy.next;
};
