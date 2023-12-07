// 排序，预期结果从小到大。
const { arr, swap } = require("./common");

// 原地快速排序。借助双指针，不占用额外的存储空间

// ↙ [left, right) 左闭右开  排序的时候从left排序到right-1位置
function partition(A, start, end) {
  // 数组A的index [left, left + 1, ..., right - 1]
  const guess = A[start]; // 以首位为基准
  let i = start + 1;
  let j = end - 1;
  while (i <= j) {
    if (A[i] <= guess) {
      i++;
    } else {
      swap(A, i, j);
      j -= 1
      // ↑ 交换后i指针位置没改变，继续回到if中比较A[i]和guess
    }
  }
  swap(A, start, j);
  return j;
}

function qSort(A, start = 0, end = A.length) {
  if (end - start <= 1) {
    return;
  }
  const pivot = partition(A, start, end);
  console.log("pivot->", pivot, "----- A[pivot]->", A[pivot]);
  console.log("=== A:", A);

  // ↙ pivot这个位置，已经排好了，不参与下一步的排序，所以第二个qSort从pivot+1开始
  qSort(A, start, pivot);
  qSort(A, pivot + 1, end);
}

/* 
const curArr = arr.slice(0);
qSort(curArr);
console.log("原地快排->", curArr);
 */

// 这种原地快排，时间复杂度是 O(n * log(n))
// 空间复杂度是O(1)


// partition的过程

// v1
//  s  i        j   (s表示start, s不动，以后都省略; guess = 2)
// [2, 7, 6, 3, 5]

//     i        j   (swap 执行后)
// [2, 5, 6, 3, 7]

//     i     j  (j -= 1 执行后)   
// [2, 5, 6, 3, 7]

//     i     j  (swap 执行后)
// [2, 3, 6, 5, 7]

//     i  j  (j -= 1 执行后)
// [2, 3, 6, 5, 7]

//     i  j  (swap 执行后)
// [2, 6, 3, 5, 7]

//    i==j  (j -= 1 执行后)
// [2, 6, 3, 5, 7]

//    i==j  (swap执行后  swap(A, i, j) 且 i == j )
// [2, 6, 3, 5, 7]

//  j  i  (j -= 1 执行后)
// [2, 6, 3, 5, 7]

//  j  i  (离开while循环, swap(A, start, j)执行后 swap(A, start, j) 且 start == j)
// [2, 6, 3, 5, 7]


const test = [2, 7, 6, 3, 5];
qSort(test);
console.log("test->", test);


// v2
//  s  i        j  (s表示start, s不动，以后都省略; guess = 6)
// [6, 7, 3, 2, 5]

//     i        j  (swap 执行后)
// [6, 5, 3, 2, 7]

//     i     j  (j -= 1 执行后)
// [6, 5, 3, 2, 7]

//        i  j  (i += 1 执行后)
// [6, 5, 3, 2, 7]

//          i==j  (i += 1 执行后)
// [6, 5, 3, 2, 7]

//           j  i  (i += 1 执行后)
// [6, 5, 3, 2, 7]

//           j  i  (离开while循环, swap(A, start, j)执行后)
// [2, 5, 3, 6, 7]

// const test = [6, 7, 3, 2, 5];
// qSort(test);
// console.log("test->", test);