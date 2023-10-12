/*
 * [51] N 皇后
 */
// 注意，这题不是回溯，这题是 递归+剪枝。

/* 
  按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。

  n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

  给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

  每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
*/

/* 
  输入：n = 4
  输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
  解释：如上图所示，4 皇后问题存在两个不同的解法。
*/

// 思路
/* 
  res = [];
  // 行数row 来遍历, res记录 列数col  (row, col都从0开始)

  res = [[1, 3, 0, 2], [2, 0, 3, 1]] // 回溯实现
  // 伪代码 [[(0,1), (1,3), (2, 0), (3, 2)], [(0,2), (1,0), (2,3), (3,1)]]

  res = [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
I*/

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const res = [];
  dfs(0, []);
  return res;

  function dfs(r, colArr) {
    if (r === n) {
      res.push(format(colArr));
    }

    for (let c = 0; c < n; c++) {
      if (isLegal(r, c, colArr)) {
        dfs(r + 1, [...colArr, c]);
      }
    }
  }

  function isLegal(r, c, colArr) {
    // 判断 三要素
    /* 
      1、是否是不同的行  row !== r  这个在dfs实现的时候已经保证了，所以 不需要判定
      2、是否是不同的列  col !== c  #需要判定
      3、是否在不同的斜线  分两种情况 row - col !== r - c (左上斜线)  以及  row + col !== r + c (右上斜线)  #需要判定
    */
    const flag = colArr.every(
      (col, row) => col !== c && row - col !== r - c && row + col !== r + c
    );
    return flag;
  }

  function format(numArr) {
    // [0, 1, 2, 3] => ["Q...", ".Q..", "..Q.", "...Q"]
    const len = numArr.length;
    const strArr = numArr.map((num) => {
      const dotArr = new Array(len).fill(".");
      dotArr[num] = "Q";
      return dotArr.join("");
    });
    return strArr;
  }
};

let res = solveNQueens(4);
console.log({ res });
