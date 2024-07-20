/* 
  题目描述

  现需要实现一种算法，能将一组压缩字符串还原成原始字符串，还原规则如下:
    1、字符后面加数字N，表示重复字符N次。例如：压缩内容为A3，表示原始字符串为AAA。
    2、花括号中的字符串加数字N，表示花括号中的字符重复N次。例如压缩内容为{AB}3，表示原始字符串为ABABAB。
    3、字符加N和花括号后面加N，支持任意的嵌套，包括互相嵌套，例如：压缩内容可以{A3B1{C}3}3

  输入描述:
    输入一行压缩后的字符串
  输出描述：
    输出压缩前的字符串

  示例1
    输入输出示例仅供调试，后台判题数据一般不包含示例
  输入
    {A3B1{C}3}3
  输出
    AAABCCCAAABCCCAAABCCC

  说明
  {A3B1{C}3}3代表A字符重复3次，B字符重复1次，花括号中的C字符重复3次，最外层花括号中的AAABCCC重复3次

  tag: [菊花厂] [栈]
*/

// 返回数字以及下个下标index
function getNum(str, index) {
  let numStr = "";
  let res = {};
  for (let i = index; i < str.length; i++) {
    const curChar = str[i];
    if (/\d/.test(curChar)) {
      numStr += curChar;
    } else {
      res = {
        num: numStr === "" ? 1 : Number(numStr),
        tail: i - 1
      }
      return res;
    }
  }

  // 有一种特殊情况，str[str.length - 1] 的值是一个num 此时要走到这里返回
  res = {
    num: numStr === "" ? 1 : Number(numStr),
    tail: str.length
  }
  return res;
}

function decompressString(compressedStr) {
  const stack = [];
  for (let i = 0; i < compressedStr.length; i++) {
    const curChar = compressedStr[i];
    if (curChar === "{") {
      stack.push(curChar);
    } else if (curChar === "}") {
      let contentToRepeat = "";
      while (stack[stack.length - 1] !== "{") { // 很巧妙的终止条件
        contentToRepeat = stack.pop() + contentToRepeat;
      }
      stack.pop();

      const { num, tail } = getNum(compressedStr, i + 1);
      stack.push(contentToRepeat.repeat(num));

      i = tail;
    } else {
      // 字母的情况
      const { num, tail } = getNum(compressedStr, i + 1);
      stack.push(curChar.repeat(num));
      
      i = tail;
    }
    
    // console.log("stack", i, stack); // 观察运行情况
  }
  return stack.join("");
}

const test = "{A3B1{C}3}3";
const res = decompressString(test);
console.log("res->", res); // AAABCCCAAABCCCAAABCCC

const test1 = "{A2B11{C}}2";
const res1 = decompressString(test1);
console.log("res1->", res1); // AABBBBBBBBBBBCAABBBBBBBBBBBC
