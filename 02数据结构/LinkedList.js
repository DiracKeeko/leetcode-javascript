// 实现链表

class Node {
  constructor(element) {
    this.val = element;
    this.next = null;
  }
}

// append, appendAt, remove, indexOf, getNode
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  append(element) {
    const node = new Node(element);
    if (this.size === 0) {
      this.head = node;
    } else {
      const lastNode = this.getNode(this.size - 1);
      lastNode.next = node;
    }
    this.size += 1;
  }

  appendAt(index, element) {
    if (index < 0 || index > this.size) {
      throw new Error("index out of bound");
    }
    const node = new Node(element);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else if (index === this.size) {
      const lastNode = this.getNode(this.size - 1);
      lastNode.next = node;
    } else {
      const prevNode = this.getNode(index - 1);
      const nextNode = prevNode.next;
      node.next = nextNode;
      prevNode.next = node;
    }
    this.size += 1;
  }

  remove(index) {
    if (index === 0) {
      this.head = this.head.next;
    } else if (index >= this.size) {
      throw new Error("remove: index out of bound")
    } else {
      const prevNode = this.getNode(index - 1);
      prevNode.next = prevNode.next.next;
    }
    this.size -= 1;
  }

  indexOf(element) {
    let cur = this.head;
    for (let i = 0; i < this.size; i++) {
      if (cur.val === element) {
        return i;
      }
      cur = cur.next;
    }
    return -1;
  }

  getNode(index) {
    if (index < 0 || index > this.size - 1) {
      throw new Error("index out of bound");
    }
    let curNode = this.head;
    for (let i = 0; i < index; i++) {
      curNode = curNode.next;
    }
    return curNode;
  }
}

let l1 = new LinkedList();

l1.append(1);
l1.append(2);

l1.appendAt(1, "a");
l1.appendAt(1, "aa");
console.dir(l1, {depth: null});

l1.remove(0);
console.dir(l1, {depth: null});

console.log("index->", l1.indexOf("aa"));


