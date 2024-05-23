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
/* var permuteUnique = function (nums) {
  const numberToCountMap = {};
  nums.forEach((item) => {
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
  arr.forEach((item) => {
    curMap[item] = curMap[item] || 0;
    curMap[item] += 1;
  });

  for (let key in curMap) {
    if (curMap[key] > map[key]) {
      return true;
    }
  }
  return false;
} */

// v02 优化
var permuteUnique = function (nums) {
  // 数字有重复，排列不能重复 => 先排序 
  // (必须排序) 才方便进行树层去重 (树层级别的剪枝)
  nums.sort((a, b) => a - b);

  const res = [];
  const path = [];
  backtrack([]);
  return res;

  function backtrack(used) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];

      // used[i - 1] === false 说明是树层上的 (前一个没有用，回溯到这个分支)
      if (nums[i] === nums[i - 1] && used[i - 1] === false) {
        continue;
      }

      // ↓ 这里不能用 used[i] === false 因为第一次使用的时候，这里是undefined
      if (!used[i]) {
        path.push(num);
        used[i] = true;
        backtrack(used);
        path.pop();
        used[i] = false;
      }
    }
  }
};

// 直接给出全量 usedArr
var permuteUnique = function(nums) {
  nums.sort((a, b) => a - b);
  const usedArr = new Array(nums.length).fill(false);

  const res = [];
  const path = [];
  backtrack(usedArr);
  return res;

  function backtrack(usedArr) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 处理同一层的逻辑 (同层级的剪枝逻辑)
      if (nums[i] === nums[i - 1] && usedArr[i - 1] === false) {
        continue;
      }

      // 处理下一层的逻辑，下一层不关注是否与前一个数相等，只关注是否使用
      /* 
      // 省略了 usedArr[i] === true
      if (usedArr[i] === true) {
        continue;
      }
       */
      if (usedArr[i] === false) {
        usedArr[i] = true;
        path.push(nums[i]);
        backtrack(usedArr);
        usedArr[i] = false;
        path.pop();
      }
    }
  }

};

let testCase = [1, 1, 2];
let res = permuteUnique(testCase);
console.log({ res });


/* 
const curL = [1, 1, 1, 2];
const used = [0, 0, 0, 0];

下一层 (第二层) 有两个分支
const curL = [1, 1, 1, 2];  |  const curL = [1, 1, 1, 2];
const used = [1, 0, 0, 0];  |  const used = [0, 0, 0, 1];
*/