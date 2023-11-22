/*
 * [877] 石子游戏
 */

/* 
Alice 和 Bob 用几堆石子在做游戏。一共有偶数堆石子，排成一行；每堆都有 正 整数颗石子，数目为 piles[i] 。

游戏以谁手中的石子最多来决出胜负。石子的 总数 是 奇数 ，所以没有平局。

Alice 和 Bob 轮流进行，Alice 先开始 。 每回合，玩家从行的 开始 或 结束 处取走整堆石头。 这种情况一直持续到没有更多的石子堆为止，此时手中 石子最多 的玩家 获胜 。

假设 Alice 和 Bob 都发挥出最佳水平，当 Alice 赢得比赛时返回 true ，当 Bob 赢得比赛时返回 false 。

*/

/* 
  [7, 2]  Alce取 7   true
  [3,7,2,3] Alice取(index = 3的)3，再取7  true
  [3, 9, 12, 5]   Alice 3, Bob 9, Alice 12, Bob 5;  false
                  Alice 5, Bob 12, Alice 9, Bob 3;  true  这种路径可以获胜
  [3, 12, 9, 5]   Alice 3, Bob 12, Alice 9, Bob 5;  false
                  Alice 5, Bob 9, Alice 12, Bob 3;  true  这种路径可以获胜

  规律: 路径只有两种，一种是index为偶数，一种是index是奇数，如果Alice足够聪明，她可以算出偶数位的数字和 以及 奇数位的数字和，选取数字和大的那一个路径，就可以获胜。

  所以Alice必胜
*/

/**
 * @param {number[]} piles
 * @return {boolean}
 */
var stoneGame = function(piles) {
  return true;
};