/*
 * [347] 前 K 个高频元素
 */

/* 
  给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

// v1 朴实无华的排序解
var topKFrequent = function(nums, k) {
  const map = {};
  nums.forEach(item => {
    map[item] = map[item] || 0;
    map[item] += 1;
  })
  const keyArr = Object.keys(map);
  const valueAndKey2dArr = keyArr.map(key => [key, map[key]]);
  const sort2DArr = valueAndKey2dArr.sort(([, a], [, b]) => b - a);
  return sort2DArr.slice(0, k).map(([key]) => key);
};

// v2 用堆优化时间复杂度
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

var topKFrequent = function(nums, k) {
  const map = {};
  nums.forEach(item => {
    map[item] = map[item] || 0;
    map[item] += 1;
  })

  // 维护一个小顶堆  堆里存放的是key
  const heap = new Heap((a, b) => map[a] < map[b]);
  Object.keys(map).forEach((key, index) => {
    if (index < k) {
      heap.push(key);
    } else if (map[heap.top()] < map[key]) {
      // heap.push(key);
      // heap.pop();
      // 下面两行代码的意图和上面两行相同
      heap.arr[1] = key;
      heap.sinkDown(1);
    }
  })
  return heap.arr.slice(1);
};
/* 
21/21 cases passed (64 ms)
Your runtime beats 94.52 % of javascript submissions
Your memory usage beats 95.56 % of javascript submissions (42.3 MB)
*/