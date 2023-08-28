/* 
[79] 单词搜索

给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

*/

/*
  输入：
  board = [
    ["A","B","C","E"],
    ["S","F","C","S"],
    ["A","D","E","E"]
  ]
  word = "ABCCED"
  输出：true
*/
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  if (word.length === 0) {
    return true;
  }
  if (board.length === 0) {
    return false;
  }

  const row = board.length;
  const col = board[0].length;
  let res = false;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      res = findWord(i, j, 0);
      if (res) {
        return true;
      }
    }
  }
  return false;

  function findWord(i, j, wordCurIndex) {
    if (i < 0 || i >= row) {
      return false;
    }
    if (j < 0 || j >= col) {
      return false;
    }
    const curLetter = board[i][j];
    if (curLetter !== word[wordCurIndex]) {
      return false;
    }
    if (wordCurIndex === word.length - 1) {
      return true;
    }

    board[i][j] = null; // 避免回头
    const nextIndex = wordCurIndex + 1;

    const ret =
      findWord(i + 1, j, nextIndex) ||
      findWord(i - 1, j, nextIndex) ||
      findWord(i, j + 1, nextIndex) ||
      findWord(i, j - 1, nextIndex);

    board[i][j] = curLetter; // 回撤、放回去
    return ret;
  }
};
