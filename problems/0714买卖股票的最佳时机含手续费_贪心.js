/*
 * [714] 买卖股票的最佳时机含手续费
 */

/* 
给定一个整数数组 prices，其中 prices[i]表示第 i 天的股票价格 ；整数 fee 代表了交易股票的手续费用。

你可以无限次地完成交易，但是你每笔交易都需要付手续费。如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。

返回获得利润的最大值。

注意：这里的一笔交易指买入持有并卖出股票的整个过程，每笔交易你只需要为支付一次手续费。
*/

/* 
  输入：prices = [1, 3, 2, 8, 4, 9], fee = 2
  输出：8

  解释：能够达到的最大利润:  
  在此处买入 prices[0] = 1
  在此处卖出 prices[3] = 8
  在此处买入 prices[4] = 4
  在此处卖出 prices[5] = 9
  总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8
*/

// 贪心算法求解
// https://juejin.cn/post/7005945841051516936
/* 
  将手续费买入时进行计算，即可得到一种贪心的方法；
    我们定义buy表示：最大化利益的前提下，当我们手上有一只股票时，那么他的买入最低价格。

    初始化为buy=prices[0]+fee;
    
    如果当前股票prices[i]+fee<buy;则我们更新最低买入价格buy;
    如果当前股票大于buy,则我们可以直接卖出获得利润 profit=prices[i]-buy;
  
    但是此时我们卖出可能不是最优解，比如：第二天价格继续上升；
    因此我们可以假设有个反悔操作，假设当前手上有一只买入价格为prices[i]的股票，
    将buy更新为prices[i] -> buy=prices[i];
    如果第二天价格继续上升，我们将获得prices[i+1]-prices[i],此时，加上前一天prices[i]-buy的收益，
    由上可知，相当于当天不做任何操作，而在第二天卖出:prices[i+1]-buy
    其余情况，不值得卖出；
*/

/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function(prices, fee) {
  let sum = 0;
  let buy = prices[0] + fee;

  for (let i = 1; i < prices.length; i++) {
    const cur = prices[i];
    if (cur + fee < buy) {
      buy = cur + fee;
    } else if (cur > buy) {
      sum += cur - buy;
      buy = cur;
    }
  }
  return sum;
};


const fee = 2;
const arr = [1, 3, 2, 8, 4, 9];
/* 
  sum = 0; buy = 3; (i = 1)
  sum = 0; buy = 3; (i = 2)
  sum = 5; buy = 8; (i = 3)
  sum = 5; buy = 6; (i = 4)
  sum = 8; buy = 9; (i = 5)
*/
// 变更只在 4 + fee (fee = 2) < 8 的时候发生。
// 也就是说，后面的值足够的小，能够cover买入费fee;

const arr1 = [1, 3, 2, 8, 7, 9];
/* 
  sum = 0; buy = 3; (i = 1)
  sum = 0; buy = 3; (i = 2)
  sum = 5; buy = 8; (i = 3)
  sum = 5; buy = 8; (i = 4)
  sum = 6; buy = 9; (i = 5)
*/

const arr2 = [1, 3, 2, 8, 7, 4, 9];
/* 
  sum = 0; buy = 3; (i = 1)
  sum = 0; buy = 3; (i = 2)
  sum = 5; buy = 8; (i = 3)
  sum = 5; buy = 8; (i = 4)
  sum = 5; buy = 6; (i = 5)
  sum = 8; buy = 9; (i = 6)
*/

const res = maxProfit(arr, fee);
console.log("res->", res);