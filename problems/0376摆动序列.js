/*
 * [376] 摆动序列
 */

/* 
  如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为 摆动序列 。第一个差（如果存在的话）可能是正数或负数。仅有一个元素或者含两个不等元素的序列也视作摆动序列。
*/

/* 
  给你一个整数数组 nums ，返回 nums 中作为 摆动序列 的 最长子序列的长度 。
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function(nums) {
  const arr = removeDuplicate(nums);
  
  if (arr.length === 1) {
    return 1;
  }

  if (arr.length === 2) {
    const [s, e] = arr;
    if (s === e) {
      return 1;
    }
    return 2;
  }

  let count = 0; // 拐点的个数 (峰 和 谷 都是拐点)
  let preDiff = arr[1] - arr[0];
  for (let i = 1; i < arr.length - 1; i++) {
    let lastDiff = arr[i + 1] - arr[i];
    if (preDiff > 0 && lastDiff < 0 || preDiff < 0 && lastDiff > 0) {
      count += 1;
    }
    preDiff = lastDiff;
  }
  return count + 2;
};

function removeDuplicate(arr) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== arr[i + 1]) {
      res.push(arr[i]);
    }
  }
  return res;
}

// v2
var wiggleMaxLength = function(nums) {
  trimContinuousSame(nums); // 先修剪，去掉nums中连续相同的数 [1, 1, 2, 2] -> [1, 2]

  const len = nums.length;
  if (len === 1) {
    return 1;
  }

  let res = 2; // 加上头、尾两个点
  for (let i = 1; i < len - 1; i++) {
    const pre = nums[i - 1];
    const cur = nums[i];
    const next = nums[i + 1];
    if (pre > cur && next > cur) {
      res += 1;
    }
    if (pre < cur && next < cur) {
      res += 1;
    }
  }
  return res;

};

function trimContinuousSame(arr) {
  let i = 1;
  while (i < arr.length) {
    if (arr[i - 1] === arr[i]) {
      arr.splice(i, 1);
    } else {
      i += 1;
    }
  }
}


const arr = [1, 1, 1, 2, 2, 2, 3];
const res = removeDuplicate(arr);
console.log({res});