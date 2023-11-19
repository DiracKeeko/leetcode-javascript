/*
 * [4] 寻找两个正序数组的中位数
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

// v3 二分查找
var findMedianSortedArrays = function (nums1, nums2) {
  // 两数组长度之和
  const len = nums1.length + nums2.length;
    // 中位数为第 mid 小的值
    // 如果len为奇数，则中位数就是第 mid 小的值
    // 否则是第 mid 和第 mid+1 小的值
  const mid = (len + 1) >> 1; // 如[0, 1, 2]; len = 3; mid = (3 + 1) / 2 = 2; 第2小的元素
  
  // 奇数长度
  if (len % 2 === 1) return getNum(nums1, 0, nums2, 0, mid);
  // 偶数长度 (找到两个值 取平均)
  return (
    (getNum(nums1, 0, nums2, 0, mid) + getNum(nums1, 0, nums2, 0, mid + 1)) / 2
  );

  /**
    @param  {array} arr1 被寻找的第一个数组
    @param  {number} ind1 第一个数组的起始下标 
    @param  {array} arr2 被寻找的第二个数组
    @param  {number} ind2 第二个数组的起始下标 
    @param  {number} k 要寻找的是第k小值
    @return {number} 找到的第k小值
   */

  // getNum -> 从arr1的ind1位置开始 和 arr2的ind2位置开始 找第k小的元素
  function getNum(arr1, ind1, arr2, ind2, k) {
    // 某个数组空了，剩下的个数取另一个没空的数组的值
    if (ind1 === arr1.length) return arr2[ind2 + k - 1];
    if (ind2 === arr2.length) return arr1[ind1 + k - 1];
    // 还差一步，返回当前两个值中的最小值
    if (k === 1) return Math.min(arr1[ind1], arr2[ind2]);

    // 从第一个数组的ind1位置开始，尝试向后走k/2距离，如果数组长度不足k/2，则走到数组末尾
    let step1 = Math.min(k >> 1, arr1.length - ind1);

    // 第二个数组尝试向后走k-第一个数组走的距离，如果不够，走到数组末尾
    const step2 = Math.min(k - step1, arr2.length - ind2);
    // 再用step2倒推一下step1
    step1 = k - step2;

    // 满足下面的if 说明 arr1[ind1+step1] 之前的元素可以排除
    if (arr1[ind1 + step1 - 1] < arr2[ind2 + step2 - 1]) {
      return getNum(arr1, ind1 + step1, arr2, ind2, k - step1);
    }
    // 反之 arr2[ind2+step2] 之前的元素可以排除
    return getNum(arr1, ind1, arr2, ind2 + step2, k - step2);
  }
};

/* 
v3
2094/2094 cases passed (88 ms)
Your runtime beats 92.16 % of javascript submissions
Your memory usage beats 96.85 % of javascript submissions (44.9 MB)
*/
