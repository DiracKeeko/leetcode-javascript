/*
 * [139] 单词拆分
 */

/* 
  给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。

  注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
*/

/* 
  输入: s = "leetcode", wordDict = ["leet", "code"]
  输出: true
  解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。


  输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
  输出: false
*/

// 思路 转化为完全背包
/* 
  一维dp数组求解

  dp[j] 长度为j的字符串s, 能否被wordDict中的单词表示

  const preIndex = j - wordDict[i].length;
  dp[j] = dp[j - preIndex] && s.slice(preIndex, j + 1) === wordDict[i];

  // ## 注意 dp.length = s.length + 1; 所以才有上面的递推公式 
  // 实际上:  
    j位置能否被单词表示 
        = (j - preIndex - 1)位置能否被单词表示 && s.slice(preIndex, j + 1) === wordDict[i]

  dp[j] = Array(s.length + 1);
  dp[j]填充为false , dp[0] = true;

  两层for循环  先遍历容量，再遍历物品

*/
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let j = 1; j <= s.length; j++) {
    for (const word of wordDict) {
      const preIndex = j - word.length;
      if (preIndex >= 0) {
        if (dp[preIndex] && s.slice(preIndex, j) === word) {
          dp[j] = true;
        }
      }
    }
  }
  
  console.log({dp});
  return dp[s.length];
};


// v2 效率更高
var wordBreak = function(s, wordDict) {
  const len = s.length;
  const dp = Array(len + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= len; i++) {
    for (const word of wordDict) {
      if (dp[i]) {
        continue;   
      }
      const le = word.length;
      const startIndex = i - le;
      if (startIndex >= 0) {
        const cutStr = s.slice(startIndex, i);
        dp[i] = dp[startIndex] && cutStr === word;
      }
    }
  }
  console.log(dp);
  return dp[len];
};

const s = "leetcode", wordDict = ["leet","code"];
// const s = "ab", wordDict = ["a","b"];
wordBreak(s, wordDict);