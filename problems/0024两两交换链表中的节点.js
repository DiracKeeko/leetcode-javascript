/*
 * [24] 两两交换链表中的节点

  给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 */

/* 
  输入：head = [1,2,3,4]
  输出：[2,1,4,3]

  输入：head = [1,2,3,4,5]
  输出：[2,1,4,3,5]
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
 * @return {ListNode}
 */
var swapPairs = function(head) {
  const dummy = new ListNode(0, head);
  let prev = dummy;
  let odd = head;
  let even = head ? head.next : null;
  while(odd && even) {
    const nextNode = even.next;
    // ↓ 反序连接节点
    odd.next = nextNode;
    even.next = odd;
    prev.next = even;

    prev = odd;
    odd = nextNode;
    even = nextNode ? nextNode.next : null;
  }
  return dummy.next;
};


// ↓ 用这个版本
/* 
  注意：在所有的节点都被声明的时候 (let key1 = node1; let key2 = node2);
    不需要反序连接节点(next)，可以放心的使用变量名正序连接
    
    最后的重新声明节点，也可以直接使用被声明的变量名
*/
var swapPairs = function(head) {
  const dummy = new ListNode(0, head);
  let prev = dummy;

  while(head && head.next) {
    let odd = head;
    let even = head.next;
    
    const nextNode = even.next;
    // ↓ 正序连接节点
    prev.next = even;
    even.next = odd;
    odd.next = nextNode;

    prev = odd;
    head = nextNode;
  }
  return dummy.next;
};
