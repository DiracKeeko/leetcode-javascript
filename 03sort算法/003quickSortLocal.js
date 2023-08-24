// 排序，预期结果从小到大。
const { arr, swap } = require("./common");

// 原地快速排序。借助双指针，不占用额外的存储空间

// ↙ [left, right) 左闭右开  排序的时候从left排序到right-1位置
function partition(A, left, right) {
  // 数组A的index [left, left + 1, ..., right - 1]
  let pivot = A[right - 1]; // flag位置
  let i = left;
  let j = right - 1;
  while (i !== j) {
    if (A[i] <= pivot) {
      i++;
    } else {
      swap(A, i, --j);
      // ↑ 交换后i指针位置没改变，继续回到if中比较A[i]和pivot
    }
  }
  swap(A, j, right - 1);
  return j;
}

function qSort(A, lo = 0, hi = A.length) {
  if (hi - lo <= 1) {
    return;
  }
  let p = partition(A, lo, hi);
  // ↙ p这个位置，已经排好了，不参与下一步的排序，所以第二个qsort从p+1开始
  qSort(A, lo, p);
  qSort(A, p + 1, hi);
}

const curArr = arr.slice(0);
qSort(curArr);
console.log("原地快排->", curArr);

// 这种原地快排，时间复杂度是 O(n * log(n))
// 空间复杂度是O(1)