// 二叉堆结构
// 实现二叉堆 就是要实现一个class Heap 实现其中的push(item), pop(), top()三个方法
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
    this.compare = compareFunc ? compareFunc : (a, b) => b > a; // 默认大顶堆
  }
  get size() {
    return this.arr.length - 1;
  }
  push(item) {
    // 新增元素
    this.arr.push(item);
    this.shiftUp(this.size);
  }
  pop() {
    // 弹出HeapTop元素
    if (this.size === 0) {
      return null;
    }
    // 先将HeapTop与HeapBottom调换位置，再弹出HeapBottom元素，最后让HeapTop元素进行下沉
    this.swap(1, this.size); // === this.swap(1, this.arr.length - 1)
    const res = this.arr.pop();
    this.sinkDown(1);
    return res;
  }
  top() {
    // 返回栈顶元素
    return this.arr[1];
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
  swap(i, j) {
    const { arr } = this;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    // 在swap函数中, 上下两种写法都可以
    // const temp = this.arr[i];
    // this.arr[i] = this.arr[j];
    // this.arr[j] = temp;
  }
  shiftUp(k) {
    const { arr, compare, parent } = this;
    while (k > 1 && compare(arr[k], arr[parent(k)])) {
      this.swap(k, parent(k)); // 这里必须要用this.swap() 不可以用下面的解构方式调用
      k = parent(k);
    }
  }
  /* 
  // 解构方式调用
  shiftUp(k) {
    const { arr, compare, parent, swap } = this;
    while (k > 1 && compare(arr[k], arr[parent(k)])) {
      swap(k, parent(k)); // 这种方式调用swap, swap函数里this的指向不对, this.arr -> undefined
      k = parent(k);
    }
  }
  */
  sinkDown(k) {
    const { arr, compare, left, right, size } = this;
    while (left(k) <= size) {
      let childIndex = left(k);
      if (right(k) <= size && compare(arr[right(k)], arr[left(k)])) {
        childIndex = right(k);
      }
      if (compare(arr[k], arr[childIndex])) {
        return;
      }
      this.swap(k, childIndex);
      k = childIndex; // 继续下沉操作
    }
  }
}

// 创建堆时传入一个compare函数 决定这个堆是大顶堆还是小顶堆
// let heap = new Heap((a, b) => a > b); // 大顶堆
// heap.push(3);
// heap.push(1);
// heap.push(2);
// heap.push(4);
// console.log({heap});
// console.log("heap.top->", heap.top());
// console.log("heap.pop->", heap.pop());
// console.log({heap});

const smallTopHeap = new Heap((a, b) => a < b); // 小顶堆
smallTopHeap.push(3);
smallTopHeap.push(1);
smallTopHeap.push(2);
smallTopHeap.push(4);
console.log({smallTopHeap});
console.log("smallTopHeap.top->", smallTopHeap.top());
console.log("smallTopHeap.pop->", smallTopHeap.pop());
console.log({smallTopHeap});

/* 
  特点：
    1、插入 和 删除 操作都是log2(n)的复杂度。
    2、随时可以获取堆中的最大值和最小值。
*/