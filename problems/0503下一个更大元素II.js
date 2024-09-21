/*
 * [503] 下一个更大元素 II
 */

/* 
  给定一个循环数组 nums （ nums[nums.length - 1] 的下一个元素是 nums[0] ），返回 nums 中每个元素的 下一个更大元素 。

  数字 x 的 下一个更大的元素 是按数组遍历顺序，这个数字之后的第一个比它更大的数，这意味着你应该循环地搜索它的下一个更大的数。如果不存在，则输出 -1 。
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// 用取模操作，模拟循环
var nextGreaterElements = function(nums) {
  const size = nums.length;
  const res = Array(size).fill(-1);
  const stack = [0]; // stack记录各个元素的index
  for (let i = 1; i < size * 2; i++) { // 这里for循环的边界取 size * 2
    const reIndex = i % size; // 在这里取模
    while (stack.length && nums[reIndex] > nums[stack[stack.length - 1]]) {
      const topIndex = stack.pop();
      res[topIndex] = nums[reIndex];
    }
    stack.push(reIndex);
  }
  return res;
};

const test = [1, 2, 1];
const res = nextGreaterElements(test);

/* 
  总结:
    这里是取了两遍。
    
    1. 在不成环的条件下，仅遍历一遍，没有比nums中item大的数字，则item中的元素是-1
    2. 在有环条件下，遍历两遍，通过reIndex的做法，让nums中item之前的数字也有了与item比较的机会。
        2.1 遍历两遍的情况下，没有比item更大的数字的话，两个item的reIndex留在stack中，res[index]默认值还是-1，
        2.2 若有比item大的数字，则res[index]会变更一次，第二次遍历的时候，找不到比res[reIndex]更大的数字，所以reIndex留在stack中，但res[index]已经变更了。
*/