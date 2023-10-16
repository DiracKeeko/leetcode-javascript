/*
 * [47] 全排列 II
 */

/* 
  给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  const numberToCountMap = {};
  nums.forEach(item => {
    numberToCountMap[item] = numberToCountMap[item] || 0;
    numberToCountMap[item] += 1;
  });

  const res = [];
  const path = [];
  const map = {};
  backtrack();
  return res;

  function backtrack() {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      path.push(nums[i]);
      const len = path.length;
      const str = path.join("");
      map[len] = map[len] || [];
      
      if (isOverStep(path, numberToCountMap) || map[len].includes(str)) {
        path.pop();
        continue;
      }

      map[len].push(str);
      backtrack();
      path.pop();
    }
  }
};

function isOverStep(arr, map) {
  // 判断arr中相同item的个数小于等于 map中同key对应的value的个数
  const curMap = {};
  arr.forEach(item => {
    curMap[item] = curMap[item] || 0;
    curMap[item] += 1;
  });
  
  for (let key in curMap) {
    if (curMap[key] > map[key]) {
      return true;
    }
  }
  return false;
}

let testCase = [1,1,2];
let res = permuteUnique(testCase);
console.log({res});


// function test() {
//   const obj = {
//     1: 1,
//     2: 2,
//     3: 3
//   }
//   for (const key in obj) {
//     console.log("val->", obj[key]);
//   }
// }

// test();