/*
 * [295] 数据流的中位数
 */

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

var MedianFinder = function() {
  // 大顶堆，放小的一半数据
  // 小顶堆，放大的一半数据
  // 保证 大顶堆的size > 小顶堆的size
  this.bigTop = new Heap((a, b) => a > b);
  this.smallTop = new Heap((a, b) => a < b);
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  if (!this.bigTop.size || num < this.bigTop.top()) {
    this.bigTop.push(num);
  } else {
    this.smallTop.push(num);
  }

  if (this.bigTop.size - this.smallTop.size > 1) {
    this.smallTop.push(this.bigTop.pop());
  } else if (this.smallTop.size > this.bigTop.size) {
    this.bigTop.push(this.smallTop.pop());
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  if ((this.bigTop.size + this.smallTop.size) % 2 === 1) {
    return this.bigTop.top();
  }
  return (this.bigTop.top() + this.smallTop.top()) / 2;
};