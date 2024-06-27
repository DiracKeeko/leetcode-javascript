// https://kamacoder.com/problem.php?id=1046

// 01背包问题

/* 
  小明是一位科学家，他需要参加一场重要的国际科学大会，以展示自己的最新研究成果。他需要带一些研究材料，但是他的行李箱空间有限。这些研究材料包括实验设备、文献资料和实验样本等等，它们各自占据不同的空间，并且具有不同的价值。 

  小明的行李空间为 N，问小明应该如何抉择，才能携带最大价值的研究材料，每种研究材料只能选择一次，并且只有选与不选两种选择，不能进行切割。
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
    11
*/

/**
 * @param weight  物品的消耗的空间 (占据的重量)
 * @param value   物品的价值
 * @param bagSize 背包的容量
 */

/* 
  dp五步
  1. 确定dp数组（dp table）以及下标的含义
    二维dp数组 dp[i][j] 表示从下标为[0-i]的物品里任意取，放进容量为j的背包，得到的价值总和最大值

  2. 确定递推公式
    dp[i][j] = Math.max(dp[i-1][j], dp[i - 1][j - weight[i]] + value[i])
    
    dp[i][j] 有两种得到的方式
      一种是第i件物品超出剩余容量，无法放入。 此时 dp[i][j] = dp[i-1][j]
      一种是第i件物品恰好等于剩余容量，可以放入。 此时dp[i][j] = dp[i - 1][j - weight[i]] + value[i]
      要取这两种情况的最大值

      此外还有一种情况，需要在程序里特殊处理。 -> 如果 j < weight[i], 则只能取 dp[i-i][j]

  3. dp数组如何初始化
    i -> 物品序号
    j -> 背包容量
    
    在背包容量j大于等于i=0的物品重量时，dp[0][j] = value[0];  -> 第一行初始化为 0，j >= weight[i]后面填充为value[0]
    在背包容量j为0时，dp[i][j]都是0   -> 第一列初始化为0

  4. 确定遍历顺序
    两层for循环，先遍历物品 以及 先遍历背包容量都可以，因为dp[i][j]是由dp[i][j]的正上方和左上方推导得到。
    
    先遍历物品更好理解。选择先遍历物品

  5. 举例推导dp数组
*/

// 二维dp数组实现
function testWeightBagProblem(weight, value, size) {
  const len = weight.length;
  const dp = new Array(len).fill(0).map(() => new Array(size + 1).fill(0)); // dp[i][j]全部初始化为0
  
  /* 
  for (let j = 0; j <= size; j++) {
    dp[0][j] = j > weight[0] ? value[0] : 0;
  }
  // 用下面的方式初始化第一行
   */
  for (let j = weight[0]; j <= size; j++) { // 这个初始化是个很优秀的思路，不需要从0开始去if判断
    dp[0][j] = value[0];
  }

  for (let i = 1; i < len; i++) {
    for (let j = 1; j <= size; j++) {
      if(j < weight[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
      }
    }
  }
  // console.table(dp);
  return dp[len - 1][size];
}

/* 
const weight = [2, 2, 3, 1, 5, 2];
const value = [2, 3, 1, 5, 4, 3];
const size = 6;
const res = testWeightBagProblem(weight, value, size);
console.log({res});
*/

// 一维dp数组实现 (滚动数组)
/* 
  1. 确定dp数组（dp table）以及下标的含义
    dp[j] 是从下标为[0-i]的物品里任意取，放进容量为j的背包，得到的价值总和最大值

  2. 确定递推公式
    dp[j] = Math.max(dp[j - 1], dp[j - weight[i]] + value[i])

  3. dp数组如何初始化
    全部填充0

  4. 确定遍历顺序
    先遍历物品，再遍历背包容量。 背包容量需要从大到小 (保证在遍历每一个物品i时，每个物品i只放置一次)

  5. 举例推导dp数组
*/

function testWeightBagProblem(weight, value, size) {
  const dp = new Array(size + 1).fill(0);
  const len = weight.length;

  for (let i = 0; i < len; i++) {
    for (let j = size; j >= weight[i]; j--) {
      dp[j] = Math.max(dp[j - 1], dp[j - weight[i]] + value[i]);
    }
  }
  console.log(dp);
  return dp[size];
}

const weight = [2, 2, 3, 1, 5, 2];
const value = [2, 3, 1, 5, 4, 3];
const size = 6;
const res = testWeightBagProblem(weight, value, size);
console.log({res});