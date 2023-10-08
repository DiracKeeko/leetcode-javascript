/*
 * [69] x 的平方根 
 */

/**
 * @param {number} x
 * @return {number}
 */

// ↓ 朴实无华的解
var mySqrt = function(x) {
  let i = 0;
  while (i <= x) {
    if (i * i === x) {
      return i;
    }
    if (i * i > x) {
      return i - 1;
    }
    i += 1;
  }
};


// ↓ 二分优化
var mySqrt = function(x) {
  let l = 0;
  let r = x;
  while (l <= r) {
    const i = (l + r) >> 1;
    if (i * i < x) {
      l = i + 1;
    } else if (i * i > x) {
      r = i - 1;
    } else {
      return i;
    }
  }
  return r;
};