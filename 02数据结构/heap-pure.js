class Heap {
  constructor(compareFunc) {
    this.arr = [0];
    this.compare = compareFunc ? compareFunc : (a, b) => a > b;
  }
  get size() {
    return this.arr.length - 1;
  }
  push(item) {
    this.arr.push(item);
    this.shiftUp(this.size);
  }
  pop() {
    if (this.size === 0) {
      return null;
    }
    this.swap(1, this.size);
    const res = this.arr.pop();
    this.sinkDown(1);
    return res;
  }
  top() {
    return this.arr[1];
  }
  left(k) {
    return 2 * k;
  }
  right(k) {
    return 2 * k + 1;
  }
  parent(k) {
    return k >> 1;
  }
  shiftUp(k) {
    const { arr, compare, parent } = this;
    while (k > 1 && compare(arr[k], arr[parent(k)])) {
      this.swap(k, parent(k));
      k = parent(k);
    }
  }
  sinkDown(k) {
    const { arr, compare, left, right, size } = this;
    while (left(k) <= size) {
      let childIndex = left(k);
      if (right(k) <= size && compare(arr[right(k)], arr[left(k)])) {
        childIndex = right(k);
      }
      if (compare(arr[childIndex], arr[k])) {
        this.swap(k, childIndex);
        k = childIndex;
      } else {
        return;
      }
    }
  }
  swap(i, j) {
    const { arr } = this;
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

const smallTopHeap = new Heap((a, b) => a < b); // 小顶堆
smallTopHeap.push(3);
smallTopHeap.push(1);
smallTopHeap.push(2);
smallTopHeap.push(4);
console.log({smallTopHeap});
console.log("smallTopHeap.top->", smallTopHeap.top());
console.log("smallTopHeap.pop->", smallTopHeap.pop());
console.log({smallTopHeap});
console.log("smallTopHeap.pop->", smallTopHeap.pop());
console.log({smallTopHeap});