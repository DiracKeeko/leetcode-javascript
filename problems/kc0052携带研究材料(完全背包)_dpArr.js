// https://kamacoder.com/problem.php?id=1052

// 完全背包问题

/* 
  小明是一位科学家，他需要参加一场重要的国际科学大会，以展示自己的最新研究成果。他需要带一些研究材料，但是他的行李箱空间有限。这些研究材料包括实验设备、文献资料和实验样本等等，它们各自占据不同的空间，并且具有不同的价值。 

  小明的行李空间为 N，问小明应该如何抉择，才能携带最大价值的研究材料，每种研究材料可以选择无数次，并且可以重复选择。
*/

/* 
  输入
    1.长度为 M 的数组 (M个正整数)，代表每种研究材料的所占空间。 

    2.长度为 M 的数组 (M个正整数)，代表每种研究材料的价值。
    
    3.正整数 N，代表小明的行李空间。


  输出
    输出一个整数，代表小明能够携带的研究材料的最大价值。
*/

/* 
  输入
    [2, 2, 3, 1, 5, 2]
    [2, 3, 1, 5, 4, 3]
    6
  
  输出
    30
*/

/**
 * @param weight  物品的消耗的空间 (占据的重量)
 * @param value   物品的价值
 * @param bagSize 背包的容量
 */


/* 
  dp五步
  1. 确定dp数组（dp table）以及下标的含义
    一维dp数组 dp[j] 表示从下标为[0-i]的物品里任意取无数次，放进容量为j的背包，得到的价值总和最大值

  2. 确定递推公式
    dp[i][j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
    
    dp[i][j] 有两种得到的方式
      一种是第i件物品超出剩余容量，无法放入。 此时dp[j]等于它本身。 dp[j] = dp[j]
      一种是第i件物品恰好等于剩余容量，可以放入。 此时dp[j] = dp[j - weight[i]] + value[i]
      要取这两种情况的最大值

      此外还有一种情况，需要在程序里特殊处理。 -> 如果 j < weight[i], 则只能取 dp[j]

  3. dp数组如何初始化
    j -> 背包容量

    在背包容量j为0时，dp[j]都是0   -> 行数据全部初始化为0

  4. 确定遍历顺序
    两层for循环，先遍历物品 以及 先遍历背包容量都可以，因为在二维dp数组中，
    dp[ix][j]是由dp[ix][j]的正上方和左侧dp[ix][j - nums[ix - 1]] + value[ix - 1]推导得到。
    
    先遍历物品更好理解。选择先遍历物品

  5. 举例推导dp数组
    weight = [1, 1, 2];
    value = [1, 2, 5];
    size = 4

    i = 0;  [0, 1, 2, 3, 4];
    i = 1;  [0, 2, 4, 6, 8];
    i = 2;  [0, 2, 5, 7, 10];
    
*/


// 一维dp数组实现 (滚动数组实现)
// dp[j] 容量为j的背包，在0-i之间任选，可以重复取，最大价值是dp[j]
function testWeightBagProblem(weight, value, size) {
  const len = weight.length;
  const dp = Array(size + 1).fill(0);

  for (let i = 0; i < len; i++) {
    for (let j = weight[i]; j <= size; j++) {
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
    }
  }
  console.log(dp);
  return dp[size];
}

const weight = [1, 1, 2];
const value = [1, 2, 5];
const size = 4;
/* 
const weight = [2, 2, 3, 1, 5, 2];
const value = [2, 3, 1, 5, 4, 3];
const size = 6;
 */
const res = testWeightBagProblem(weight, value, size);
console.log("res->", res);