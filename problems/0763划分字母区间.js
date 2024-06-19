/*
 * [763] 划分字母区间
 */

/* 
  给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。

  注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s 。

  返回一个表示每个字符串片段的长度的列表。
*/

/* 
  输入：s = "ababcbacadefegdehijhklij"
  输出：[9,7,8]

  解释：
  划分结果为 "ababcbaca"、"defegde"、"hijhklij" 。

  每个字母最多出现在一个片段中。
  像 "ababcbacadefegde", "hijhklij" 这样的划分是错误的，因为划分的片段数较少。 
*/

/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
  const arr = getLetterHeadAndTail(s);
  let i = 0;
  let j = 1;
  const res = [];
  let [is, ie] = arr[i];
  while (j < arr.length) {
    const [js, je] = arr[j];
    if (ie > js) {
      ie = Math.max(ie, je);
      j += 1;
    } else {
      const area = ie - is + 1;
      res.push(area);
      i = j;
      j += 1;
      [is, ie] = arr[i];
    }
  }
  res.push(ie - is + 1);
  return res;
};

function getLetterHeadAndTail(s) {
  const map = {};
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    map[char] = map[char] || [i, i];
    map[char][1] = i;
  }
  const regionArr = Object.values(map);
  regionArr.sort(([as], [bs]) => as - bs);
  return regionArr;
}

// 优化一下，不找区间，找字母的最远出现位置
// v3  比较容易理解
var partitionLabels = function(s) {
  const map = {};
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    map[char] = i;
  }

  const indexArr = []; // 创建一个arr, 存储字符出现的最大下标
  // aba -> indexArr = [2, 1, 2]。当 indexArr[i] === i 的时候，产生一次切割
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const maxIndex = map[char];
    indexArr[i] = maxIndex;
  }

  const res = [];
  let l = 0; // leftIndex
  let maxIndex = indexArr[0];
  for (let i = 0; i < indexArr.length; i++) {
    if (maxIndex === i) {
      res.push(i - l + 1);
      l = i + 1;
      maxIndex = indexArr[i + 1];
    }
    if (indexArr[i] > maxIndex) {
      maxIndex = indexArr[i];
    }
  }
  return res;
};


// v4 相较于v3,去除 indexArr
var partitionLabels = function(s) {
  const map = {};
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    map[char] = i;
  }

  const res = [];
  let l = 0; // leftIndex
  let maxIndex = map[s[0]];
  for (let i = 0; i < s.length; i++) {
    if (maxIndex === i) {
      res.push(i - l + 1);
      l = i + 1;
      const nextChar = s[i + 1];
      maxIndex = map[nextChar];
    }
    const curChar = s[i];
    if (map[curChar] > maxIndex) {
      maxIndex = map[curChar];
    }
  }
  return res;
};

// const testCase = "ababcbacadefegdehijhklij";
const testCase = "caedbdedda";
const res = partitionLabels(testCase);
console.log({res});