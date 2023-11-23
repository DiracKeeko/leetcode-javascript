// 二叉堆结构
/* 
// 用数组来维护一个二叉堆的结构

  下图中的每个数表示当前元素的在数组中的index
            1
          /   \
         2     3
        / \   / \
       4   5 6   7
 */

class Heap {
  constructor(compareFunc) {
    this.arr = [0]; // 忽略index = 0这个索引, 从index = 1 开始记录，这样方便操作
    this.compareFunc = compareFunc ? compareFunc : (a, b) => b - a; // 默认大顶堆
  }
  push(item) {
    // 新增元素
  }
  pop() {
    // 弹出栈顶元素
  }
  top() {
    // 返回栈顶元素
  }
  left(k) {
    return k * 2;
  }
  right(k) {
    return k * 2 + 1;
  }
  parent(k) {
    return k >> 1;
  }
}

// 创建堆时传入一个compare函数 决定这个堆是大顶堆还是小顶堆
let heap = new Heap((a, b) => a - b); // 小顶堆
// let heapSmallTop = new Heap((a, b) => b - a); // 大顶堆