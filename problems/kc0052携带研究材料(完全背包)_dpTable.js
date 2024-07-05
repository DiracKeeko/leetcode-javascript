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
    二维dp数组 dp[i][j] 表示从下标为[0-i]的物品里任意取无数次，放进容量为j的背包，得到的价值总和最大值

  2. 确定递推公式
    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - weight[i]] + value[i])
    
    dp[i][j] 有两种得到的方式
      一种是第i件物品超出剩余容量，无法放入。 此时 dp[i][j] = dp[i - 1][j]
      一种是第i件物品恰好等于剩余容量，可以放入。 此时dp[i][j] = dp[i][j - weight[i]] + value[i]
      要取这两种情况的最大值

      此外还有一种情况，需要在程序里特殊处理。 -> 如果 j < weight[i], 则只能取 dp[i-i][j]

  3. dp数组如何初始化
    ix -> 物品序号
    j -> 背包容量
    
    增加额外的一行，首行，填充为0。 (总体上是增加了一行一列)
    第i物品 = nums[ix - 1]
    在背包容量j为0时，dp[ix][j]都是0   -> 第一列初始化为0

  4. 确定遍历顺序
    两层for循环，先遍历物品 以及 先遍历背包容量都可以，因为dp[ix][j]是由dp[ix][j]的正上方和左侧dp[ix][j - nums[ix - 1]] + value[ix - 1]推导得到。
    
    先遍历物品更好理解。选择先遍历物品

  5. 举例推导dp数组
    weight = [1, 1, 2];
    value = [1, 2, 5];
    size = 4

    [
      [0, 1, 2, 3, 4],
      [0, 2, 4, 6, 8],
      [0, 2, 5, 7, 10]
    ]
*/


// 二维dp数组实现
function testWeightBagProblem(weight, value, size) {
  const len = weight.length;
  const dp = Array(len + 1).fill(0).map(() => new Array(size + 1).fill(0)); // dp[i][j]全部初始化为0

  for (let ix = 1; ix <= len; ix++) {
    const iMove = ix - 1; // 物品的下标为iMove
    for (let j = 1; j <= size; j++) {
      if(j < weight[ix - 1]) {
        dp[ix][j] = dp[ix - 1][j];
      } else {
        dp[ix][j] = Math.max(dp[ix - 1][j], dp[ix][j - weight[iMove]] + value[iMove]);
      }
    }
  }
  console.table(dp);
  return dp[len][size];
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