/*
 * [63] 不同路径 II
 */

/* 
  dp[i][j] 是到达[i][j]位置的路线数量

  dp[i][j] = 0 || (dp[i][j-1] + dp[i-1][j]);
  
  到达[i][j]位置的路线数量 = 0 (有障碍) ||
    到达[i][j-1]位置的路线数量 + 到达[i-1][j]位置的路线数量
  
  初始化：
    第一行填充1，如果第一行有障碍，则障碍位置到行终点的值都为0
    第一列填充1，如果第一列有障碍，则障碍位置到列终点的值都为0
  
  遍历顺序:
    两层for循环 外层for为行 内层for为列
  
  dpTable -> 
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 1, 2]
  ]
  
  返回 右下角的dp[i][j]
*/

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const rowNum = obstacleGrid.length;
  const colNum = obstacleGrid[0].length;

  // const dp = new Array(rowNum).fill([]); // 不能这么写，否则所有的行都是同一个内存地址
  const dp = new Array(rowNum).fill(1).map(() => []);

  // 初始化第一行
  let isObstacle = false;
  for (let j = 0; j < colNum; j++) {
    if (isObstacle === false) {
      obstacleGrid[0][j] === 1 && (isObstacle = true);
    }
    if (isObstacle === false) {
      dp[0][j] = 1;
    } else {
      dp[0][j] = 0;
    }
  }

  isObstacle = false;
  for (let i = 0; i < rowNum; i++) {
    if (isObstacle === false) {
      obstacleGrid[i][0] === 1 && (isObstacle = true);
    }
    if (isObstacle === false) {
      dp[i][0] = 1;
    } else {
      dp[i][0] = 0;
    }
  }
  // dp.forEach((item, i) => {
  //   console.log("dp->", i, item.slice(0));
  // })

  for (let i = 1; i < rowNum; i++) {
    for (let j = 1; j < colNum; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[rowNum - 1][colNum - 1];
};

// ↓ 逻辑精简，易于理解。 执行效率没有上面版本高
var uniquePathsWithObstacles = function (obstacleGrid) {
  const r = obstacleGrid.length;
  const c = obstacleGrid[0].length;

  // 先全部填充 0
  const dp = new Array(r).fill(0).map(() => new Array(c).fill(0)); // [[0, 0, ...], [0, 0, ...]]

  for (let j = 0; j < c && obstacleGrid[0][j] === 0; j++) {
    dp[0][j] = 1;
  }

  for (let i = 0; i < r && obstacleGrid[i][0] === 0; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i < r; i++) {
    for (let j = 1; j < c; j++) {
      dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1];
    }
  }

  console.log({ dp });
  return dp[r - 1][c - 1];
};

const testCase = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
];
const res = uniquePathsWithObstacles(testCase);
console.log({ res });
