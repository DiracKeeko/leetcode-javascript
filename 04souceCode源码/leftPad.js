// 在左侧补全字符x, 使字符串到达一个长度
// 现在这个方法已经被node内置 String.prototype.padStart();

let s = "hello";
// console.log("padStart", s.padStart(10, "x"));

function leftPadSimple(str, length, ch) {
  let len = length - str.length + 1;
  return Array(len).join(ch) + str;

  // console.log(Array(3).join("x")); // -> "xx"
}

console.log("leftPad 01->", leftPadSimple(s, 10, "x"));

// ↓ 二分思想优化leftPad
function leftPad(str, length, ch) {
  let len = length - str.length;

  let total = "";
  let cache = ch;

  while (true) {
    // if (len % 2 === 1) {
    // 上下两行等价
    if (len & 1) {
      total += cache;
    }
    if (len === 1) {
      return total + str;
    }
    cache += cache;
    // len = parseInt(len / 2, 10);
    len = len >> 1;
  }
}

console.log("leftPad 02->", leftPad(s, 10, "x"));

// O(n)复杂度执行时间
console.time("leftPad01");
for (let i = 0; i < 10000; i++) {
  leftPadSimple("hello", 10000, "x");
}
console.timeEnd("leftPad01");

// 二分法log2(n)复杂度执行时间
console.time("leftPad02");
for (let i = 0; i < 10000; i++) {
  leftPad("hello", 10000, "x");
}
console.timeEnd("leftPad02");

// &运算符：按位与（本质上是二进制下的数按位对齐取与操作）
// length & 1  等价于  length % 2 === 1
