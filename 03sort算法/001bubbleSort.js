// 排序，预期结果从小到大。

const { arr, swap } = require("./common");

function bubbleSort(A) {
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A.length - 1 - i; j++) {
      A[j] > A[j + 1] && swap(A, j, j + 1);
    }
  }
  return A;
}

const res = bubbleSort(arr.slice(0));
console.log("res->", res);

// 两次for循环，n x n
// 二分查找的时间复杂度是 O(n^2)  