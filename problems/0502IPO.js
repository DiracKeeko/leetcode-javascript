/*
 * [502] IPO
 */

/* 
  给你 n 个项目。对于每个项目 i ，它都有一个纯利润 profits[i] ，和启动该项目需要的最小资本 capital[i] 。

  最初，你的资本为 w 。当你完成一个项目时，你将获得纯利润，且利润将被添加到你的总资本中。

  总而言之，从给定项目中选择 最多 k 个不同项目的列表，以 最大化最终资本 ，并输出最终可获得的最多资本。

  答案保证在 32 位有符号整数范围内。
*/

/* 
输入：k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
输出：4

解释：
由于你的初始资本为 0，你仅可以从 0 号项目开始。
在完成后，你将获得 1 的利润，你的总资本将变为 1。
此时你可以选择开始 1 号或 2 号项目。
由于你最多可以选择两个项目，所以你需要完成 2 号项目以获得最大的资本。
因此，输出最后最大化的资本，为 0 + 1 + 3 = 4。


输入：k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
输出：6
*/
/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
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

var findMaximizedCapital = function(k, w, profits, capital) {
  const arr = capital.map((item, index) => [item, profits[index]]);
  arr.sort(([a], [b]) => a - b); // 成本从小到大排序
  const heap = new Heap((a, b) => a > b);

  let curIndex = 0;
  while (k > 0) {
    while (curIndex < arr.length && arr[curIndex][0] <= w) {
      // console.log("arr[curIndex]->", arr[curIndex]);
      // ↓ 在第k次方案选择前，把成本允许的方案都放进堆中(看做方案库)。 
      // 由于是个大顶堆，堆顶一定是收益最大的方案。
      heap.push(arr[curIndex][1]); 
      curIndex += 1;
    }

    // ↓ 在第k次选择方案时，选中当前方案库中收益最大的方案
    if (heap.size > 0) {
      w += heap.pop(); // 是pop不是top  选中后就把这个方案弹出(因为不可以重复选择)
    } else {
      break;
    }
    k -= 1;
  }

  return w;
};

const k = 2, w = 0, profits = [1,2,3], capital = [0,1,1];
const res = findMaximizedCapital(k, w, profits, capital);
console.log("res->", res);
