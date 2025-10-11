/**
 * [15] 三数之和
  给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
  你返回所有和为 0 且不重复的三元组。

  注意：答案中不可以包含重复的三元组。
 */

/* 
  一层for循环找第一个数 + for循环内的双指针来找第二个数
  
  要点是排序和去重
    去重操作在 for 循环 和 双指针操作时都需要
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// v1
var threeSum = function (nums) {
  if (nums.length < 3) {
    return [];
  }
  // 先排序
  nums.sort((a, b) => a - b); // a - b从小到大排序
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    // ↓ 这里必须是 nums[i] === nums[i - 1] // 必须先放入，想一想 [0, 0, 0]的情况
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    const curNum = nums[i];
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      if (curNum + nums[left] + nums[right] === 0) {
        res.push([curNum, nums[left], nums[right]]); // 先放入，想一想 [0, 0, 0]的情况
        while (nums[left] === nums[left + 1]) {
          // ↑ 判断下一步，去重
          left++;
        }
        while (nums[right] === nums[right - 1]) {
          right--;
        }
        left++;
        right--;
      } else if (curNum + nums[left] + nums[right] > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
  return res;
};


// v2 self 逻辑更清晰
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const len = nums.length;
  if (nums[0] > 0 || len < 3) {
    return [];
  }

  const res = [];
  for (let i = 0; i < len; i++) {
    if (nums[i] === nums[i - 1]) {
      continue;
    }
    let j = i + 1;
    let k = len - 1;
    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];
      if (sum === 0) {
        res.push([nums[i], nums[j], nums[k]]);
        j += 1; // 从这一行开始，到最近的代码块结束，和v1版本不同
        k -= 1;
        while (nums[j] === nums[j - 1]) {
          j += 1;
        }
        while (nums[k] === nums[k + 1]) {
          k -= 1;
        }
      } else if (sum > 0) {
        k -= 1;
      } else {
        // sum < 0
        j += 1;
      }
    }
  }
  return res;
}
