/*
 * [707] 设计链表
 */

/* 
  你可以选择使用单链表或者双链表，设计并实现自己的链表。

  单链表中的节点应该具备两个属性：val 和 next 。val 是当前节点的值，next 是指向下一个节点的指针/引用。

  如果是双向链表，则还需要属性 prev 以指示链表中的上一个节点。假设链表中的所有节点下标从 0 开始。
*/

/* 
实现 MyLinkedList 类：

  MyLinkedList() 初始化 MyLinkedList 对象。
  
  int get(int index) 获取链表中下标为 index 的节点的值。如果下标无效，则返回 -1 。
  
  void addAtHead(int val) 将一个值为 val 的节点插入到链表中第一个元素之前。在插入完成后，新节点会成为链表的第一个节点。

  void addAtTail(int val) 将一个值为 val 的节点追加到链表中作为链表的最后一个元素。
  
  void addAtIndex(int index, int val) 将一个值为 val 的节点插入到链表中下标为 index 的节点之前。如果 index 等于链表的长度，那么该节点会被追加到链表的末尾。如果 index 比长度更大，该节点将 不会插入 到链表中。

  void deleteAtIndex(int index) 如果下标有效，则删除链表中下标为 index 的节点。
*/

/* 
输入
  ["MyLinkedList", "addAtHead", "addAtTail", "addAtIndex", "get", "deleteAtIndex", "get"]
  [[], [1], [3], [1, 2], [1], [1], [1]]
  输出
  [null, null, null, null, 2, null, 3]

  解释
  MyLinkedList myLinkedList = new MyLinkedList();
  myLinkedList.addAtHead(1);
  myLinkedList.addAtTail(3);
  myLinkedList.addAtIndex(1, 2);    // 链表变为 1->2->3
  myLinkedList.get(1);              // 返回 2
  myLinkedList.deleteAtIndex(1);    // 现在，链表变为 1->3
  myLinkedList.get(1);              // 返回 3
*/

var Node = function(element) {
  this.val = element;
  this.next = null;
}

var MyLinkedList = function() {
  this.size = 0;
  this.dummy = new Node(null);
  this.head = null;
};

MyLinkedList.prototype.getNode = function(index) {
  if (isNaN(index) || index > this.size - 1 || index < 0) {
    throw new Error("index out of range");
  }

  let curNode = this.head;
  for (let i = 0; i < index; i++) {
    curNode = curNode.next;
  }
  return curNode;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
  if (isNaN(index) || index > this.size - 1 || index < 0) {
    return -1;
  }
  return this.getNode(index).val;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
  const newNode = new Node(val);
  newNode.next = this.head;
  this.dummy.next = newNode;
  this.head = this.dummy.next;
  this.size += 1;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
  const newNode = new Node(val);
  if (this.size === 0) {
    this.dummy.next = newNode;
    this.head = this.dummy.next;
  } else {
    const tailNode = this.getNode(this.size - 1);
    tailNode.next = newNode;
  }
  this.size += 1;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index > this.size) {
    return;
  }
  if (index === 0) {
    this.addAtHead(val);
  } else {
    const newNode = new Node(val);
    const preNode = this.getNode(index - 1);
    const nextNode = preNode.next;
    newNode.next = nextNode;
    preNode.next = newNode;
  }
  this.size += 1;
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index >= this.size) {
    return;
  }
  if (index === 0) {
    this.dummy.next = this.head.next;
    this.head = this.dummy.next;
  } else {
    const preNode = this.getNode(index - 1);
    preNode.next = preNode.next.next;
  }
  this.size -= 1;
};

const myLinkedList = new MyLinkedList();
myLinkedList.addAtHead(1);
myLinkedList.addAtTail(3);
myLinkedList.addAtIndex(1, 2);    // 链表变为 1->2->3
myLinkedList.get(1);              // 返回 2
myLinkedList.deleteAtIndex(1);    // 现在，链表变为 1->3
myLinkedList.get(1);              // 返回 3

console.dir(myLinkedList, {depth: null});