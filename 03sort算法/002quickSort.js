
// 排序，预期结果从小到大。
const { arr, swap } = require("./common");

// 快速排序

// ↓ 这一步的作用是把arr[0]排到数组中间位置
function quickSortBase(arr) {
  const flag = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    const curNum = arr[i];
    arr[i] < flag && left.push(curNum);
    arr[i] >= flag && right.push(curNum);
  }
  return left.concat(flag, right);
}

// console.log(quickSortBase(arr));

// ↓ 加上递归思想，把左右子数组也进行递归操作。
function quickSort(arr) {
  // 终止条件 [],[x] 都不排序直接返回
  if (arr.length < 2) {
    return arr;
  }

  const flag = arr[0];
  const left = [];
  const right = [];
  for (let i = 1; i < arr.length; i++) {
    const curNum = arr[i];
    arr[i] < flag && left.push(curNum);
    arr[i] >= flag && right.push(curNum);
  }
  return quickSort(left).concat(flag, quickSort(right));
}

console.log(quickSort(arr));

// 快速排序的时间复杂度是 O(n * log(n))

// 在本例的快速排序算法(quickSort)中，空间复杂度也是O(n * log(n)),这是一个不能被接受的空间复杂度