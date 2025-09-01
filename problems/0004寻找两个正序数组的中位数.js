/*
 * [4] 寻找两个正序数组的中位数
 */

/* 
  给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
  请你找出并返回这两个正序数组的 中位数 。
  
  算法的时间复杂度应该为 O(log (m+n))
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

// v1 不考虑时间复杂度问题，用数组排序来实现 O(m + n)
var findMedianSortedArrays = function (nums1, nums2) {
  const arr = nums1.concat(nums2);
  arr.sort((a, b) => a - b);
  const size = arr.length;

  const mid = size >> 1;
  if (size % 2 === 1) {
    return arr[mid];
  } else {
    return (arr[mid] + arr[mid - 1]) / 2;
  }
};

// v2 不考虑时间复杂度问题，用双指针来实现 O((m + n) / 2)
// 每次都向新数组尾部插入两个输入数组最小的值
var findMedianSortedArrays = function (nums1, nums2) {
  const arr = [];
  const [len1, len2] = [nums1.length, nums2.length];
  const mid = (len1 + len2) >> 1;
  let n1 = 0;
  let n2 = 0;
  while (n1 < len1 || n2 < len2) {
    if (n1 === len1) {
      arr.push(nums2[n2]);
      n2 += 1;
    } else if (n2 === len2) {
      arr.push(nums1[n1]);
      n1 += 1;
    } else {
      const min1 = nums1[n1];
      const min2 = nums2[n2];
      if (min1 < min2) {
        arr.push(min1);
        n1 += 1;
      } else {
        arr.push(min2);
        n2 += 1;
      }
    }

    if (arr.length > mid) {
      if ((len1 + len2) % 2 === 1) {
        return arr[mid];
      } else {
        return (arr[mid] + arr[mid - 1]) / 2;
      }
    }
  }
};
/* 
v2
2094/2094 cases passed (92 ms)
Your runtime beats 84.97 % of javascript submissions
Your memory usage beats 93.86 % of javascript submissions (44.9 MB)
*/


// v2.2 一个不同的写法
var findMedianSortedArrays = function (nums1, nums2) {
  const [len1, len2] = [nums1.length, nums2.length];
  const sum = len1 + len2;
  const mid = sum >> 1;

  const arr = [];
  let i = 0;
  let j = 0;
  while (arr.length <= mid) {
    if (i === len1) {
      arr.push(nums2[j]);
      j += 1;
    } else if (j === len2) {
      arr.push(nums1[i]);
      i += 1;
    } else if (nums1[i] < nums2[j]) {
      arr.push(nums1[i]);
      i += 1;
    } else {
      arr.push(nums2[j]);
      j += 1;
    }
  }

  if ((sum) % 2 === 1) {
    return arr[mid];
  } else {
    return (arr[mid] + arr[mid - 1]) / 2;
  }
};

// v3 二分查找
// const totalLeft = (m + n + 1) >> 1;
// 数组总长度为偶数 左边数字个数 = 右边数字个数
// 数组总长度为奇数 左边数字个数 = 右边数字个数 + 1 (左边个数多一个)
// 这种定义的方式是左边元素比右边元素多一个
var findMedianSortedArrays = function (nums1, nums2) {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  const m = nums1.length; // 小
  const n = nums2.length;

  let low = 0;
  let high = m;
  while (low <= high) {
    const p1 = (low + high) >> 1;
    const p2 = ((m + n + 1) >> 1) - p1;

    const maxLeft1 = p1 === 0 ? -Infinity : nums1[p1 - 1];
    const maxLeft2 = p2 === 0 ? -Infinity : nums2[p2 - 1];
    
    const minRight1 = p1 === m ? Infinity : nums1[p1];
    const minRight2 = p2 === n ? Infinity : nums2[p2];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // 找到了，计算中位数
      if ((m + n) % 2 === 0) {
        console.log("偶数");
        const maxLeft = Math.max(maxLeft1, maxLeft2);
        const minRight = Math.min(minRight1, minRight2);
        return (maxLeft + minRight) / 2;
      } else {
        console.log("奇数");
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      high = p1 - 1; // (看nums1的位置，大了就high = p1 - 1)
    } else {
      // maxLeft2 > minRight1 (看nums1的位置，小了就low = p1 + 1)
      low = p1 + 1;
    }
  }
};

/* 
v3
2094/2094 cases passed (88 ms)
Your runtime beats 92.16 % of javascript submissions
Your memory usage beats 96.85 % of javascript submissions (44.9 MB)
*/


/* 
核心思想：寻找完美的分割线
想象一下，我们将两个已排序的数组 A 和 B 合并成一个大数组 C。中位数就是 C 中间的一个或两个数。

我们的目标是找到这个中位数，但不真正地合并数组。

我们可以把 A 和 B 分别切成两半：

A:   A_left  |  A_right
B:   B_left  |  B_right
如果我们能找到一个“完美的分割”，使得：

A_left 和 B_left 中的所有元素，都小于等于 A_right 和 B_right 中的所有元素。

len(A_left) + len(B_left) 等于 len(A_right) + len(B_right) (或者多一个，当总长度为奇数时)。

那么，我们就成功地将合并后的大数组 C 分成了左右两半。中位数就由 A_left 的最大值、B_left 的最大值、A_right 的最小值、B_right 的最小值这四个数决定。


如何找到这个完美的分割？
假设我们在较短的数组（不妨设为 nums1）的 i 位置切一刀，那么 nums1 被分为：

左半部分：nums1[0...i-1]

右半部分：nums1[i...m-1]

为了满足上面提到的“长度”条件，nums2 的分割线 j 的位置就被确定了。合并后左半部分的总长度应该是 (m + n + 1) / 2（这里 +1 是个小技巧，可以同时兼容奇偶总长度的情况）。所以 j = (m + n + 1) / 2 - i。

现在我们有了四个关键值：

maxLeft1：nums1 左半部分的最大值 (nums1[i-1])

minRight1：nums1 右半部分的最小值 (nums1[i])

maxLeft2：nums2 左半部分的最大值 (nums2[j-1])

minRight2：nums2 右半部分的最小值 (nums2[j])

要使分割“完美”，必须满足条件： maxLeft1 <= minRight2 并且 maxLeft2 <= minRight1。

maxLeft1 > minRight2：说明 nums1 的分割点 i 太靠右了，需要向左移动 (high = i - 1)。

maxLeft2 > minRight1：说明 nums1 的分割点 i 太靠左了，需要向右移动 (low = i + 1)。

通过对较短数组的分割点 i 进行二分查找，我们就能高效地找到这个完美的 i。


详细步骤解析
确定二分范围：为了保证效率，我们对较短的数组（假设是 nums1）进行二分查找。查找的范围是 nums1 所有可能的分割位置，从 0 到 m（m 是 nums1 的长度）。

循环二分:

在 [0, m] 范围内取一个中间位置 partition1 (这就是我们上文说的 i)。

根据 partition1 计算出 nums2 的分割位置 partition2 (即 j)，公式为 partition2 = (m + n + 1) / 2 - partition1。

找出分割线两边的四个值：maxLeft1, minRight1, maxLeft2, minRight2。

注意处理边界：如果 partition1 是 0，说明 nums1 左半部分为空，maxLeft1 可视为负无穷大。如果 partition1 是 m，说明 nums1 右半部分为空，minRight1 可视为正无穷大。nums2 同理。

判断与移动:

如果 maxLeft1 <= minRight2 并且 maxLeft2 <= minRight1: 找到了完美的分割，可以计算中位数了。

如果总长度 m+n 是 奇数，中位数就是 max(maxLeft1, maxLeft2)。

如果总长度 m+n 是 偶数，中位数是 (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2。

如果 maxLeft1 > minRight2: 说明 partition1 太大了，需要把它向左移动。在二分查找中，这意味着收缩右边界 high = partition1 - 1。

如果 maxLeft2 > minRight1: 说明 partition1 太小了，需要把它向右移动。在二分查找中，这意味着收缩左边界 low = partition1 + 1。

返回结果：当找到完美分割后，计算并返回中位数。

*/
/* 
case1

[0, 1]
[1, 2, 3, 4]

case1解析:
m = 2; 
n = 4;

迭代1
low = 0, high = 2;
p1 = (0 + 2) >> 1 = 1; p2 = ((2 + 4 + 1) >> 1) - p1 = 2;
maxLeft1 = 0; maxLeft2 = 2; minRight1 = 1; minRight2 = 3;

没找到，且 maxLeft2 > minRight1; low = p1 + 1 = 2;

迭代2
low = 2, high = 2;
p1 = (2 + 2) >> 1 = 2; p2 = ((2 + 4 + 1) >> 1) - p1 = 1;
maxLeft1 = 1; maxLeft2 = 1; minRight1 = Infinity; minRight2 = 2;

符合条件，开始计算中位数
(m + n) % 2 === 0; 偶数
maxLeft = 1; minRight = 2;
res = (maxLeft + minRight) / 2 = 1.5


case2

[1, 2, 3]
[1, 3, 5, 7]

case2解析:
m = 3; 
n = 4;

迭代1
low = 0, high = 3;
p1 = (0 + 3) >> 1 = 1; p2 = ((3 + 4 + 1) >> 1) - p1 = 3;
maxLeft1 = 1; maxLeft2 = 5; minRight1 = 2; minRight2 = 7;

没找到，且 maxLeft2 > minRight1; low = p1 + 1 = 2;


迭代2
low = 2, high = 3;
p1 = (2 + 3) >> 1 = 2; p2 = ((3 + 4 + 1) >> 1) - p1 = 2;
maxLeft1 = 2; maxLeft2 = 3; minRight1 = 3; minRight2 = 5;

符合条件，开始计算中位数
(m + n) % 2 === 1; 奇数
maxLeft = Math.max(maxLeft1, maxLeft2) = 3;
res = 3;
*/



// const arr1 = [0, 1];
// const arr2 = [1, 2, 3, 4];
const arr1 = [1, 2, 3];
const arr2 = [1, 3, 5, 7];
console.log(findMedianSortedArrays(arr1, arr2));


// 视频解析
// 1 力扣官方 代码不太好理解
// https://www.bilibili.com/video/BV1Xv411z76J

// 2
// https://www.bilibili.com/video/BV1H5411c7oC
