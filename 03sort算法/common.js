function swap(A, i, j) {
  const t = A[i];
  A[i] = A[j];
  A[j] = t;
}

const arr = [22, 13, 127, 68, 2, 333, 90, 7];

exports.swap = swap;
exports.arr = arr;