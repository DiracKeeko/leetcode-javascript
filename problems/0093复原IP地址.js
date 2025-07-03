/*
 * [93] 复原 IP 地址
 */

/* 
  有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

  例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。

  给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。
*/

/* 
  输入：s = "25525511135"
  输出：["255.255.11.135","255.255.111.35"]
*/

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
  const res = [];
  const path = [];
  backtrack(1, 0);
  return res;

  // dotNum = 1, 表示开始寻找第1段ip地址
  function backtrack(dotNum, startIndex) {
    if (dotNum === 5) {
      res.push(path.join("."));
      return;
    }

    for (let i = startIndex + 1; i <= s.length; i++) {
      const slice = s.slice(startIndex, i);
      if (dotNum === 4 && i < s.length) {
        continue;
      }
      if (isLegal(slice)) {
        path.push(slice);
        backtrack(dotNum + 1, i);
        path.pop();
      }
    }
  }
};

function isLegal(str) {
  if (str === "0") {
    return true;
  }
  if (str[0] !== "0" && Number(str) <= 255) {
    return true;
  }
  return false;
}


/**
 让我们分析一下当 dotNum === 4 时，也就是在寻找第4段 IP 地址时，代码在做什么。

  此时，for 循环正在尝试从 startIndex 开始，切分出字符串 s 的最后一部分作为第4段。

  使用 continue (您的原始代码)
  for 循环开始，i 从 startIndex + 1 往后走。

  假设剩余字符串是 "11135"，startIndex 指向 "1" 的前面。

  循环第一次，i 指向第一个 "1" 后面，切片是 "1"。此时 i < s.length。

  if (dotNum === 4 && i < s.length) 条件成立。

  执行 continue。意思是：“我知道第4段不能只取"1"，因为后面还有"1135"没用完。所以这次尝试无效，跳过它，进行下一次循环，试试切片"11"”。

  循环会继续，直到最后一次循环，i === s.length，切片为 "11135"。这时 if 条件不成立，代码会继续向下执行 isLegal 判断，这是正确的逻辑。

  ✅ 结论：continue 正确地跳过了所有无效的、没有用尽剩余字符串的切分尝试，并保留了最后一次（唯一可能正确的）尝试。
 */