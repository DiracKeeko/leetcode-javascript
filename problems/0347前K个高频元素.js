/*
 * [347] 前 K 个高频元素
 */

/* 
  给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

// v1 朴实无华的排序解
var topKFrequent = function(nums, k) {
  const map = {};
  nums.forEach(item => {
    map[item] = map[item] || 0;
    map[item] += 1;
  })
  const keyArr = Object.keys(map);
  const valueAndKey2dArr = keyArr.map(key => [key, map[key]]);
  const sort2DArr = valueAndKey2dArr.sort(([, a], [, b]) => b - a);
  return sort2DArr.slice(0, k).map(([key]) => key);
};