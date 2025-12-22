// 给你一个字符串 s，找到 s 中最长的 回文 子串。

/* 
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。

输入：s = "cbbd"
输出："bb"
*/

// v1 
// 以每一个index作为起始位置，向右找最长的回文串，再把最长的回文串存储到结果中
// o(n^3)
var longestPalindrome = function(s) {
  let max = 0;
  let res = "";
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j <= s.length; j++) {
      const str = s.slice(i, j);
      if (isPalindrome(str)) {
        if (str.length > max) {
          max = str.length;
          res = str;
        }
      }
    }
    if (max + i > s.length) {
      break;
    }
  }
  return res;
};

function isPalindrome(str) {
  let l = 0;
  let r = str.length - 1;

  while (l <= r) {
    if (str[l++] !== str[r--]) {
      return false;
    }
  }
  return true;
}

// v2 
// “中心扩展法”的思想 插入"#", 头尾也加上"#", 找每个index左右两侧的最长的回文串
// o(n^2)
var longestPalindrome = function(s) {
  const str = "#" + s.split("").join("#") + "#";
  let max = 0;
  let res = "";
  for (let i = 0; i < str.length; i++) {
    let j = 1;

    // 要加上 i - j >= 0 && i + j <= str.length 
    // 防止出现 undefined === undefined 始终越界
    while (i - j >= 0 && i + j <= str.length && str[i - j] === str[i + j]) {
      j += 1;
    }
    j -= 1;
    const strSlice = str.slice(i - j, i + j + 1);
    const strMax = strSlice.split("#").join("");
    if (strMax.length > max) {
      max = strMax.length;
      res = strMax;
    }
  }
  return res;
};

// v2.1 
var longestPalindrome = function(s) {
  const str = "#" + s.split("").join("#") + "#";

  let max = 0
  let res = "";
  for (let i = 0; i < str.length; i++) {
    let l = i - 1;
    let r = i + 1;
    while (l > 0 && r <= str.length) {
      if (str[l] === str[r]) {
        l -= 1;
        r += 1;
      } else {
        break;
      }
    }
    
    l += 1;
    r -= 1;
    const strSlice = str.slice(l, r + 1);
    const trimStr = strSlice.split("#").join("");
    const len = trimStr.length;
    if (len > max) {
      max = len;
      res = trimStr;
    }
  }
  return res;
};