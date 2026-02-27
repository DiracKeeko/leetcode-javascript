/* 
  找出比当前数字组合“刚好大一点点”的下一个组合。如果已经是最大的了，就回到最小的（升序）。
*/

/*
示例 1：

输入：nums = [1,2,3]
输出：[1,3,2]
示例 2：

输入：nums = [3,2,1]
输出：[1,2,3]
示例 3：

输入：nums = [1,1,5]
输出：[1,5,1]
*/

/* 
核心思路：寻找“转折点”
想象一下数字 1, 2, 7, 4, 3, 1。我们要找它的下一个排列，就像在找字典里紧接着它的下一个单词。

要让一个数字变大，我们需要把后面一个较大的数和前面一个较小的数交换。但为了让增幅“尽可能小”，我们需要在尽可能靠右的位置进行这种交换。

算法三部曲：
从后往前找“下降点”：
从右向左遍历，找到第一个比右边邻居小的数字。我们称它的下标为 i。

在 1, 2, 7, 4, 3, 1 中，从右往左看：1 < 3 < 4 < 7 都在上升，直到遇到 2（2 < 7）。

所以 i 指向数字 2。

注意：如果找不到这样的 i，说明数组是全降序的（如 5,4,3,2,1），直接反转整个数组即可。

找“刚好大一点”的数交换：
再次从右往左看，找到第一个比 nums[i] 大的数。我们称它的下标为 j。

我们要把 2 换走，后面比 2 大的数有 7, 4, 3。其中最靠右（且最小）的是 3。

交换 nums[i] 和 nums[j]：数组变成 1, 3, 7, 4, 2, 1。

反转尾部：
现在开头变成了 1, 3，但后面的 7, 4, 2, 1 还是降序的。为了让整体数值最小，我们需要把这个降序部分变成升序。

反转 i 之后的所有元素：数组变成 1, 3, 1, 2, 4, 7。这就是答案

*/


var nextPermutation = function(nums) {
  let i = nums.length - 2;
  while (nums[i] >= nums[i + 1]) {
    i -= 1;
  }

  if (i >= 0) {
    let j = nums.length - 1;
    while (j >= 0 && nums[i] >= nums[j]) {
      j -= 1;
    }
    swap(nums, i, j);
  }
  reverse(nums, i + 1, nums.length - 1);

  function swap(nums, i, j) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }

  function reverse(nums, i, j) {
    while (i < j) {
      swap(nums, i, j);
      i += 1;
      j -= 1;
    }
  }
};

/* 
Accepted
266/266 cases passed (0 ms)
Your runtime beats 100 % of javascript submissions
Your memory usage beats 64.61 % of javascript submissions (54.9 MB)
*/