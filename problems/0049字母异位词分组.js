/*
 * [49] 字母异位词分组
  给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

 */

/* 
示例 1:

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

解释：

在 strs 中没有字符串可以通过重新排列来形成 "bat"。
字符串 "nat" 和 "tan" 是字母异位词，因为它们可以重新排列以形成彼此。
字符串 "ate" ，"eat" 和 "tea" 是字母异位词，因为它们可以重新排列以形成彼此。

示例 2:
输入: strs = [""]
输出: [[""]]

示例 3:
输入: strs = ["a"]
输出: [["a"]]
*/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  // 1. 创建一个哈希表，用于存储 Key -> [单词列表] 的映射
  const map = new Map();

  for (let s of strs) {
      // 2. 生成 Key：将单词拆分、排序、再拼回字符串
      // 例如 "eat" -> ["e", "a", "t"] -> ["a", "e", "t"] -> "aet"
      const sortedKey = s.split('').sort().join('');

      // 3. 将原始单词放入对应的组中
      if (!map.has(sortedKey)) {
          map.set(sortedKey, []);
      }
      map.get(sortedKey).push(s);
  }

  // 4. 返回哈希表中所有的 Value 值即可
  return Array.from(map.values());
};

var groupAnagrams = function(strs) {
  const map = new Map();
  for (const str of strs) {
    const key = str.split("").sort().join("");
    if (map.has(key)) {
      map.get(key).push(str);
    } else {
      map.set(key, [str]);
    }
  }
  return Array.from(map.values());
};

/* 
Accepted
128/128 cases passed (21 ms)
Your runtime beats 81.06 % of javascript submissions
Your memory usage beats 74.51 % of javascript submissions (67.6 MB)
*/
