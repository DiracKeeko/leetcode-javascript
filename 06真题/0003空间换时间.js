/* 
题目：

给你一个整数数组nums，请计算数组的中心位置，数组的中心位置是数组的一个下标,
  其左侧所有元素相乘的积等于右侧所有元素相乘的积。数组第一个元素的左侧积为1，最后一个元素的右侧积为1。
  如果数组有多个中心位置，应该返回最靠近左边的那一个，如果数组不存在中心位置，返回-1。

输入描述
  输入只有一行，给出N个正整数用空格分隔：nums=2 5 3 6 5 6
  1 <= nums.length <= 1024
  1 <= nums[i] <= 10

输出描述
  输出
  3

解释：中心位置是3

示例1输入输出示例仅供调试，后台判题数据一般不包含示例

输入
253656
*/

// v1 可行
// function findCenterIndex(nums) {
//   const left = [1]; // left 存放 i左侧乘积
//   const right = [1]; // right 存放 i右侧乘积
//   const len = nums.length;
//   for (let i = 1; i < len; i++) {
//     left[i] = left[i - 1] * nums[i - 1];
//     right[i] = right[i - 1] * nums[len - i];
//   }
//   right.reverse();

//   // console.log("left->", left);
//   // console.log("right->", right);

//   for (let i = 0; i < len; i++) {
//     if (left[i] === right[i]) {
//       return i;
//     }
//   }
//   return -1;
// }

// v2 用两个数字存储左右乘积，更加节省空间
function findCenterIndex(nums) {
  if (nums.length === 1) {
    return 0;
  }

  // 初始化左侧乘积和全部乘积
  let leftProduct = 1;
  let rightProduct = nums.reduce((acc, cur) => acc * cur, 1);

  for (let i = 0; i < nums.length; i++) {
    rightProduct /= nums[i];

    if (leftProduct === rightProduct) {
      return i;
    }

    leftProduct *= nums[i];
  }

  // 如果没有找到中心位置，返回-1
  return -1;
}


const numbers = [2, 5, 3, 6, 5, 6];
console.log(findCenterIndex(numbers)); // 输出：3