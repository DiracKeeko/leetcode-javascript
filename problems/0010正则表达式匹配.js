/* 
0010 正则表达式匹配

给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。

'.' 匹配任意单个字符
'*' 匹配零个或多个前面的那一个元素
所谓匹配，是要涵盖 整个 字符串 s 的，而不是部分字符串。

*/
/* 
1.确定dp数组的含义
dp[i][j] 表示从字符串s中从头选择长度为i的子串，和字符串p中从头开始取长度为j的子串，是否匹配。
(子串 s[0...i-1] 是否匹配 p 的子串 p[0...j-1])
注意i, j 都是长度 而非下标。

dp 表格的大小为 (s.length + 1) x (p.length + 1)，多出来的一行一列是为了方便处理空字符串的情况。

2.确定递推公式
case1 
当p[j - 1] !== "*" 时
dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] === p[j - 1] || p[j - 1] === ".")

(推导dp[i][j]的值, 先看pattern(j) 是否为"*"; patter(j) = p[j - 1]; )
p[j - 1]不为通配符，则dp[i][j] 取决于 dp[i - 1][j - 1]以及 p[j - 1]是否和 s[i - 1]匹配
p[j - 1] 和 s[i - 1] 匹配意味着 s[i - 1] === p[j - 1] || p[j - 1] === "."

case2
当p[j - 1] === "*" 时
又分为匹配0次和匹配多次
dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s[i - 1] === p[j - 2] || p[j - 2] === "."))

case2.1 匹配0次 
(
  其效果为在p的子串中抵消末尾2位
  子串 s[0...i-1] 和 子串 p[0...j-1]的是否匹配，只需要看 s[0...i-1] 和 p[0...j-3]的结果
)
dp[i][j] === dp[i][j - 2]

case2.2 匹配1次或多次
case2.2.1匹配1次
(
  匹配一次 要求 s[i - 1] === p[j - 2];
  满足匹配一次的条件后，再看 pattern是否和 "s当前的子串"去掉最后1位 匹配
  
  成功匹配一次 且 匹配一次之后模式可以继续匹配 "s当前的子串"去掉最后1位之前 的子串 才算成功匹配
  s[i - 1] === p[j - 2] && dp[i - 1][j]
)
dp[i][j] === s[i - 1] === p[j - 2] && dp[i - 1][j]

case2.2.2匹配多次
(
  匹配多次 要求 p[j - 2] === ".";
  满足匹配多次的条件后，再看 pattern是否和 "s当前的子串"去掉最后1位 匹配
  
  成功匹配一次 且 匹配一次之后模式可以继续匹配 "s当前的子串"去掉最后1位之前 的子串 才算成功匹配
  p[j - 2] === "." && dp[i - 1][j]  (判断匹配多次只需要 dp[i - 1][j] 即可，
  因为在这种模式下dp[i - 1][j] 会由 dp[i - 2][j] 推导出 )
)
dp[i][j] === p[j - 2] === "." && dp[i - 1][j]


*/

var isMatch = function(s, p) {
  const m = s.length;
  const n = p.length;

  const dp = Array(m + 1).fill(false).map(() => Array(n + 1).fill(false));

  dp[0][0] = true;
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 2];
    }
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const sChar = s[i - 1];
      const pChar = p[j - 1];
      if (pChar !== "*") {
        dp[i][j] = dp[i - 1][j - 1] && (pChar === sChar || pChar === ".");
      } else {
        const pPrevChar = p[j - 2];
        dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (pPrevChar === sChar || pPrevChar === "."));
      }
    }
  }

  return dp[m][n];
}




var isMatch = function(s, p) {
  const m = s.length;
  const n = p.length;
  
  const dp = Array(m + 1).fill(false).map(() => Array(n + 1).fill(false));

  dp[0][0] = true;
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 2];
    }
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const sChar = s[i - 1];
      const pChar = p[j - 1];

      if (pChar !== "*") {
        // dp[i][j] = dp[i - 1][j - 1] && (sChar === pChar || pChar === ".");
        // ↓ 改成下面的写法
        if (sChar === pChar || pChar === ".") {
          dp[i][j] = dp[i - 1][j - 1];
        }
      } else {
        // pChar === "*"
        const pPrevChar = p[j - 2]; // "*"前面的字符
        
        const matchZero = dp[i][j - 2];
        let matchOneOrMore = false;
        if (sChar === pPrevChar || pPrevChar === ".") {
          matchOneOrMore = dp[i - 1][j];
        }

        dp[i][j] = matchZero || matchOneOrMore;
      }
    }
  }
  return dp[m][n];
};