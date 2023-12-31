/*
 * [37] 解数独
 */

/* 
  编写一个程序，通过填充空格来解决数独问题。

  数独的解法需 遵循如下规则：

  数字 1-9 在每一行只能出现一次。
  数字 1-9 在每一列只能出现一次。
  数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
  数独部分空格内已填入了数字，空白格用 '.' 表示。
*/

/* 
  // 输入：
  let board = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];
  // 输出：
  let res = [
    ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
    ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
    ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
    ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
    ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
    ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
    ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
    ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
    ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
  ];
 */

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== ".") {
        continue;
      }
      // ↓ 尝试放数
      for (let guess = 1; guess <= 9; guess++) {
        const guessStr = `${guess}`;
        // ↓ 先判断是否能放，能放就继续递归
        if (isLegal(board, i, j, guessStr)) {
          board[i][j] = guessStr;
          if (solveSudoku(board)) {
            return true;
          }
          board[i][j] = ".";
        }
      }
      return false;
    }
  }
  // 递归终止
  return true; // 找到解了
};

function isLegal(board, row, col, k) {
  // // 判断行是否相同
  // for (let j = 0; j < 9; j++) {
  //   if (board[row][j] === k) {
  //     return false;
  //   }
  // }

  // // 判断列是否相同
  // for (let i = 0; i < 9; i++) {
  //   if (board[i][col] === k) {
  //     return false;
  //   }
  // }

  // 将上面两个判断一起进行， 少做一次for循环 (行&列一起判断)
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === k || board[i][col] === k) {
      return false;
    }
  }

  // 判断是否在3x3格子里
  // const [rs, re] = getBound(row); // rowStart, rowEnd
  // const [cs, ce] = getBound(col); // colStart, colEnd
  // for (let i = rs; i <= re; i++) {
  //   for (let j = cs; j <= ce; j++) {
  //     if (board[i][j] === k) {
  //       return false;
  //     }
  //   }
  // }

  // 判断是否在3x3格子里
  const rowStart = parseInt(row / 3) * 3;
  const colStart = parseInt(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[rowStart + i][colStart + j] === k) {
        return false;
      }
    }
  }
  return true;
}

// function getBound(numStr) {
//   const num = parseInt(numStr);
//   if (0 <= num && num <= 2) {
//     return [0, 2];
//   } else if (3 <= num && num <= 5) {
//     return [3, 5];
//   } else {
//     return [6, 8];
//   }
// }

let board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
solveSudoku(board);
console.log({board});
