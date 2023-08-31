/*
 *
 * [509] 斐波那契数
 * 
 斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

    F(0) = 0，F(1) = 1
    F(n) = F(n - 1) + F(n - 2)，其中 n > 1
 */

/**
 * @param {number} n
 * @return {number}
 */
// 用两个临时变量取代数组，节约内存
var fib1 = function (n) {
  if (n <= 1) {
    return n;
  }
  let f1 = 0;
  let f2 = 1;
  for (let i = 2; i <= n; i++) {
    const f3 = f1 + f2;
    f1 = f2;
    f2 = f3;
  }
  return f2;
};

// 递推的方式来解这个 
function helper(memo, n) {
  if (n <= 1) {
    return n;
  }
  memo[n] = helper(memo, n - 1) + helper(memo, n - 2);
  return memo[n];
}

var fib2 = function (n) {
  let memo = [];
  return helper(memo, n);
};
