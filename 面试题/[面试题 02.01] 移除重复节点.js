/*
 * [面试题 02.01] 移除重复节点
 */

// 编写代码，移除未排序链表中的重复节点。保留最开始出现的节点。

/*
  示例1:
  输入：[1, 2, 3, 3, 2, 1]
  输出：[1, 2, 3]

  示例2:
  输入：[1, 1, 1, 1, 2]
  输出：[1, 2]
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
var removeDuplicateNodes = function(head) {
  if (!head) {
    return head;
  }

  const s = new Set();
  s.add(head.val);
  
  let prev = head;
  let cur = head.next;
  while (cur) {
    if (s.has(cur.val)) {
      cur = cur.next;
      prev.next = cur;
    } else {
      s.add(cur.val);
      cur = cur.next;
      prev = prev.next;
    }
  }

  return head;
};


/* 
进阶：
  如果不得使用临时缓冲区，该怎么解决？

时间换空间 时间复杂度O(n^2)
 1 2 3 1 1 2
  (拿到1，从头遍历到尾，去掉所有的1)

 1 2 3 2
 1 2 3
 1 2 3
*/

var removeDuplicateNodes = function(head) {
  let p = head;
  while (p) {
    let prev = p;
    let cur = prev.next; // cur可以省略
    while (cur) {
      if (p.val === cur.val) {
        cur = cur.next;
        prev.next = cur;
      } else {
        prev = prev.next;
        cur = cur.next;
      }
    }
    p = p.next;
  }
  return head;
};

// 下面的解法比上面这个省了一个变量
var removeDuplicateNodes = function(head) {
  let p = head;
  while (p) {
    let prev = p; // 省略了cur
    while (prev.next) {
      if (p.val === prev.next.val) {
        prev.next = prev.next.next;
      } else {
        prev = prev.next;
      }
    }
    p = p.next;
  }
  return head;
};