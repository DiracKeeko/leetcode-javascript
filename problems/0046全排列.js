/* 
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

示例 1：
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let list = [];
  backtrack(list, [], nums);
  return list;
};

function backtrack(list, temp, arr) {
  // 终止条件
  if (temp.length === arr.length) {
    list.push([...temp])
    return list;
  }

  for (let i = 0; i < arr.length; i++) {
    const curStr = arr[i];
    // ↓ 在第二次for循环时，跳过重复项[1] -> [1, 2] (而不是[1] -> [1, 1])
    if (temp.includes(curStr)) {
      continue;
    }
    temp.push(curStr);
    console.log("temp->", temp);
    backtrack(list, temp, arr)
    temp.pop();
  }
}

const nums = [1, 2, 3];
console.log("res->", permute(nums));

/* 
temp-> [ 1 ]
temp-> [ 1, 2 ]
temp-> [ 1, 2, 3 ]
temp-> [ 1, 3 ]
temp-> [ 1, 3, 2 ]
temp-> [ 2 ]
temp-> [ 2, 1 ]
temp-> [ 2, 1, 3 ]
temp-> [ 2, 3 ]
temp-> [ 2, 3, 1 ]
temp-> [ 3 ]
temp-> [ 3, 1 ]
temp-> [ 3, 1, 2 ]
temp-> [ 3, 2 ]
temp-> [ 3, 2, 1 ]

res-> [
  [ 1, 2, 3 ],
  [ 1, 3, 2 ],
  [ 2, 1, 3 ],
  [ 2, 3, 1 ],
  [ 3, 1, 2 ],
  [ 3, 2, 1 ]
]

*/


// v2 更容易理解，backtrack 参数更少
var permute = function(nums) {
  const size = nums.length;
  const res = [];
  const path = [];
  const usedArr = Array(size).fill(false);
  backtrack(usedArr);
  return res;

  function backtrack(usedArr) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }

    for (let i = 0; i < size; i++) {
      if (usedArr[i]) {
        continue;
      }
      path.push(nums[i]);
      usedArr[i] = true;
      backtrack(usedArr);
      usedArr[i] = false;
      path.pop();
    }
  }
  
};

/* 
Accepted
26/26 cases passed (3 ms)
Your runtime beats 72.21 % of javascript submissions
Your memory usage beats 80.21 % of javascript submissions (59.7 MB)

*/