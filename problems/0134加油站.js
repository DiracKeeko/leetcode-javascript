/*
 * [134] 加油站
 */

/* 
  在一条环路上有 n 个加油站，其中第 i 个加油站有汽油 gas[i] 升。

  你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。

  给定两个整数数组 gas 和 cost ，如果你可以按顺序绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1 。如果存在解，则 保证 它是 唯一 的。
*/

/* 
  输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
  输出: 3
  解释:
  从 3 号加油站(索引为 3 处)出发，可获得 4 升汽油。此时油箱有 = 0 + 4 = 4 升汽油
  开往 4 号加油站，此时油箱有 4 - 1 + 5 = 8 升汽油
  开往 0 号加油站，此时油箱有 8 - 2 + 1 = 7 升汽油
  开往 1 号加油站，此时油箱有 7 - 3 + 2 = 6 升汽油
  开往 2 号加油站，此时油箱有 6 - 4 + 3 = 5 升汽油
  开往 3 号加油站，你需要消耗 5 升汽油，正好足够你返回到 3 号加油站。
  因此，3 可为起始索引。

  输入: gas = [2,3,4], cost = [3,4,3]
  输出: -1
  解释:
  你不能从 0 号或 1 号加油站出发，因为没有足够的汽油可以让你行驶到下一个加油站。
  我们从 2 号加油站出发，可以获得 4 升汽油。 此时油箱有 = 0 + 4 = 4 升汽油
  开往 0 号加油站，此时油箱有 4 - 3 + 2 = 3 升汽油
  开往 1 号加油站，此时油箱有 3 - 3 + 3 = 3 升汽油
  你无法返回 2 号加油站，因为返程需要消耗 4 升汽油，但是你的油箱只有 3 升汽油。
  因此，无论怎样，你都不可能绕环路行驶一周。
*/

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */

// 思路：先找diffArr, diffArr[i] = gas[i] - cost[i]
// 在diffArr中找起点。(找是否存在balance始终>=0的起点)

// 暴力的解，两次for循环, O(n^2) 超时了。 
// 这里diffArr实际上不用初始时就算完，但是影响不大。
var canCompleteCircuit = function(gas, cost) {
  const diffArr = gas.map((item, index) => item - cost[index]);
  
  for (let i = 0; i < diffArr.length; i++) {
    if (diffArr[i] < 0) {
      continue;
    }
    const res = checkStart(i, diffArr);
    if (res >= 0) { // 允许===0
      return res;
    }
  }
  return -1;
};

function checkStart(i, diffArr) {
  const pre = diffArr.slice(0, i);
  const next = diffArr.slice(i);
  const newArr = next.concat(pre);
  let sum = 0;
  // 循环的遍历，用while比较好
  for (let j = 0; j < newArr.length; j++) {
    sum += newArr[j];
    if (sum < 0) {
      return -1;
    }
  }
  return i;
}

// 贪心算法
// 先决条件 totalSum >= 0，那么一定能跑一圈
// 贪心的重点 如果curSum<0，那么就从curSum的下一个位置开始往后找
// v1
var canCompleteCircuit = function(gas, cost) {
  let totalSum = 0;
  let curSum = 0;
  let startIndex = 0;

  for (let i = startIndex; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    curSum += diff;
    totalSum += diff;

    if (curSum < 0) {
      startIndex = i + 1;
      curSum = 0;
    }
  }

  if (totalSum < 0) {
    return -1;
  }
  return startIndex;
}

// v2 对比v1
var canCompleteCircuit = function(gas, cost) {
  const diffArr = gas.map((item, index) => item - cost[index]); // 不需要这个diffArr
  // 多了一个存储，还多了一次循环

  let totalSum = 0;
  let sum = 0
  let index = 0;

  for (let i = 0; i < diffArr.length; i++) {
    totalSum += diffArr[i];
    sum += diffArr[i];
    if (sum < 0) {
      index = i + 1;
      sum = 0;
    }
  }

  if (totalSum < 0) {
    return -1;
  }
  return index;
};

/* 
  为什么遍历到结尾就可以选择出答案呢，而且答案就是第一个遍历到结尾累加和不为0的位置，是否答案可能是该位置后面的位置呢；

  这就需要关注一个概念，净累加油量，既然第一个遍历到结尾的位置使得在后续所有位置都满足净累加油都大于0，那么为什么不从这第一个位置出发，而是从后续的位置出发呢，毕竟这第一个位置使得后续的所有位置的起始油量都大于0，如果选择后续任意一个位置，油量都需要从0开始，通过的可能肯定不如有油；总结就是：起始给你油你都不过，凭什么你起始油=0能过呢；
*/

/* 
  [... A, a+1, ..., B, b+1, ..., C ]

  从a+1点出发，直到B点curSum才＜0。意味着从a+1点出发，初始油箱是>=0的状态，油箱有油都无法到达。从A点出发，从A走到a+1位置还要继续损耗，更不可能到达。

  到达C点时油箱有油，意味着b+i肯定比从C点开始出发更优，因为解唯一，所以一定是最优的那个。这也解释了为什么题目是环路，而我们只需要顺序遍历一次。
 */