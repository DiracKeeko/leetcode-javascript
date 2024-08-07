/* 
  [860] 柠檬水找零

  在柠檬水摊上，每一杯柠檬水的售价为 5 美元。顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。

  每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。

  注意，一开始你手头没有任何零钱。

  给你一个整数数组 bills ，其中 bills[i] 是第 i 位顾客付的账。如果你能给每位顾客正确找零，返回 true ，否则返回 false 。
*/

/* 
  输入：bills = [5,5,5,10,20]
  输出：true
  解释：
  前 3 位顾客那里，我们按顺序收取 3 张 5 美元的钞票。
  第 4 位顾客那里，我们收取一张 10 美元的钞票，并返还 5 美元。
  第 5 位顾客那里，我们找还一张 10 美元的钞票和一张 5 美元的钞票。
  由于所有客户都得到了正确的找零，所以我们输出 true。

  输入：bills = [5,5,10,10,20]
  输出：false
  解释：
  前 2 位顾客那里，我们按顺序收取 2 张 5 美元的钞票。
  对于接下来的 2 位顾客，我们收取一张 10 美元的钞票，然后返还 5 美元。
  对于最后一位顾客，我们无法退回 15 美元，因为我们现在只有两张 10 美元的钞票。
  由于不是每位顾客都得到了正确的找零，所以答案是 false。
*/

/* 
  提示：
    1 <= bills.length <= 105
    bills[i] 不是 5 就是 10 或是 20 
*/

/**
 * @param {number[]} bills
 * @return {boolean}
 */
// 贪心 (优先保留更多的5, 优先消耗10)
var lemonadeChange = function (bills) {
  let fiveNum = 0;
  let tenNum = 0;
  for (let i = 0; i < bills.length; i++) {
    const curBill = bills[i];
    if (curBill === 5) {
      fiveNum += 1;
    } else if (curBill === 10) {
      if (fiveNum > 0) {
        fiveNum -= 1;
        tenNum += 1;
      } else {
        return false;
      }
    } else {
      if (fiveNum > 0 && tenNum > 0) {
        fiveNum -= 1;
        tenNum -= 1;
      } else if (fiveNum > 2) {
        fiveNum -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
};

// v2 
var lemonadeChange = function(bills) {
  let n1 = 0; // 放置5
  let n2 = 0; // 放置10
  let n3 = 0; // 放置20
  let i = 0;
  while (n1 >= 0 && n2 >= 0 && n3 >= 0 && i < bills.length) {
    const cur = bills[i];
    if (cur === 5) {
      n1 += 1;
    } else if (cur === 10) {
      n2 += 1;
      n1 -= 1;
    } else if (cur === 20) {
      if (n2 > 0) {
        n2 -= 1;
        n1 -= 1;
      } else {
        n1 -= 3;
      }
      n3 += 1;
    }
    i += 1;
  }
  if (n1 >= 0 && n2 >= 0 && n3 >= 0 && i === bills.length) {
    return true;
  }
  return false;
};


// v3 不记录20的数量
var lemonadeChange = function(bills) {
  let n1 = 0; // 放置5
  let n2 = 0; // 放置10
  let i = 0;
  while (n1 >= 0 && n2 >= 0 && i < bills.length) {
    const cur = bills[i];
    if (cur === 5) {
      n1 += 1;
    } else if (cur === 10) {
      n2 += 1;
      n1 -= 1;
    } else if (cur === 20) {
      if (n2 > 0) {
        n2 -= 1;
        n1 -= 1;
      } else {
        n1 -= 3;
      }
    }
    i += 1;
  }
  if (n1 >= 0 && n2 >= 0 && i === bills.length) {
    return true;
  }
  return false;
};