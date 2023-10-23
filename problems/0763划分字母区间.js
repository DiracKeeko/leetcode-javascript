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

const testCase = "ababcbacadefegdehijhklij";
const res = partitionLabels(testCase);
console.log({res});