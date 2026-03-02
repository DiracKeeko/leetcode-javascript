/* 
整数数组 nums 按升序排列，数组中的值 互不相同 。

在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 向左旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如， [0,1,2,4,5,6,7] 下标 3 上向左旋转后可能变为 [4,5,6,7,0,1,2] 。

给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
*/

/* 
示例 1：

输入：nums = [4,5,6,7,0,1,2], target = 0
输出：4
示例 2：

输入：nums = [4,5,6,7,0,1,2], target = 3
输出：-1
示例 3：

输入：nums = [1], target = 0
输出：-1

*/

// 看到 时间复杂度为 O(log n) 想到二分

// 重点: 有效括号的长度取决于它和上一个无法匹配的括号（边界）之间的距离。
var search = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = (left + right) >> 1;
    if (nums[mid] === target) {
      return mid;
    }

    if (nums[left] <= nums[mid]) { // 左侧有序
      if (nums[left] <= target && target < nums[mid]) {
        // 这里的条件是 nums[left] <= target && target <= nums[mid] 只是去掉了target === nums[mid]
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else { // 右侧有序
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};

/* 
Accepted
196/196 cases passed (0 ms)
Your runtime beats 100 % of javascript submissions
Your memory usage beats 35.83 % of javascript submissions (54.4 MB)
耗时 0:19:9
*/