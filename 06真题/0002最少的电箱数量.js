/* 
  题目描述
  小明正在规划一个大型数据中心机房，为了使得机柜上的机器都能正常满负荷工作，需要确保在每个机柜边上至少要有一个电箱。

  为了简化题目，假设这个机房是一整排，M表示机柜，表示间隔，请你返回这整排机房，至少需要多少个电箱。如果无解请返回-1。

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
  const powerBoxPositions = [];
  let lastPowerBoxUsed = false;

  for (let i = 0; i < n; i++) {
    if (inputStr[i] === "M") {
      if (
        i - 1 >= 0 &&
        inputStr[i - 1] === "M" &&
        i + 1 < n &&
        inputStr[i + 1] === "M"
      ) {
        // 非头，非尾，三连M 返回-1
        return -1;
      }
      if (
        (i - 1 === 0 && inputStr.charAt(i - 1) === "M") ||
        (i + 1 === n && inputStr.charAt(i - 1) === "M")
      ) {
        // 头 或 尾 两连M 返回-1
        return -1;
      }

      const prev = Math.max(0, i - 1);
      const next = Math.min(n - 1, i + 1);

      if (powerBoxPositions.length > 0 && !lastPowerBoxUsed) {
        if (powerBoxPositions[powerBoxPositions.length - 1] === prev) {
          powerBoxPositions.pop();
          lastPowerBoxUsed = true;
        }
      } else {
        lastPowerBoxUsed = false;
      }
      powerBoxPositions.push(next);
    }
  }

  return powerBoxPositions.length;
}

//测试样例
console.log(getMinElectricBoxes("MIIM"));
