/* 
  题目描述
  小明正在规划一个大型数据中心机房，为了使得机柜上的机器都能正常满负荷工作，需要确保在每个机柜边上至少要有一个电箱。

  为了简化题目，假设这个机房是一整排，M表示机柜，表示间隔，请你返回这整排机房，至少需要多少个电箱。如果无解请返回-1。
  电箱只能放在机柜旁边的间隔位置(即I的位置)

  输入描述
    第一行输入一个字符串，由 M和I组成，表示机房的组成样式
  输出描述
    输出一个整数，表示整排机房至少需要多少个电箱。如果无解请返回-1。

  示例1:
  输入：
    MIIM
  输出:
    2

  tag: [菊花厂] [栈]
*/

function getMinElectricBoxes(inputStr) {
  const n = inputStr.length;
  const stack = []; // 栈中存放的是电箱的位置下标 index

  for (let i = 0; i < n; i++) {
    if (inputStr[i] === "M") {
      // if (i === 0 && inputStr[1] === 'M') {
      //   return -1;
      // }
      // if (i === n - 2 && inputStr[n - 1] === 'M') {
      //   return -1;
      // }
      // ↑ 头 或 尾 两连M 返回-1  上面的可以被涵盖，注释掉

      const prev = Math.max(0, i - 1);
      const next = Math.min(n - 1, i + 1);

      const prevChar = inputStr[prev];
      const nextChar = inputStr[next];

      if (prevChar === 'M' && nextChar === 'M') {
        // 使用这种写法( prev, next )，已经可以涵盖头、尾两连'M'的情况
        return -1;
      }

      if (prevChar === 'I' && nextChar === 'I') {
        // 'M' 的前后都是'I' 则判断前一个位置是否已经放过电箱
        // 前一个位置没放过电箱就在next的位置放置电箱
        /* if (stack[stack.length - 1] === prev) {
          continue;
        } else {
          stack.push(next);
        } */
        // 上下两块代码等价
        if (stack[stack.length - 1] !== prev) {
          stack.push(next);
        }
      } else if (prevChar === 'I' && nextChar === 'M') {
        if (stack[stack.length - 1] !== prev) {
          stack.push(prev);
        }
      } else if (prevChar === 'M' && nextChar === 'I') {
        stack.push(next);
      }

    }
  }
  // console.log(stack); // 查看在哪些位置放置电箱
  // console.log(stack.map(i => inputStr[i]));
  return stack.length;
}

//测试样例
// console.log(getMinElectricBoxes("MIIM"));

console.log(getMinElectricBoxes("MIIMMIIMIM"));

// console.log(getMinElectricBoxes("MMIIMMIIMIM")); // 头 两连M
// console.log(getMinElectricBoxes("MIIMMIIMIMM")); // 尾 两连M
