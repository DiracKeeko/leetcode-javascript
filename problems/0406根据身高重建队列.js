/*
 * [406] 根据身高重建队列
 */

/* 
  假设有打乱顺序的一群人站成一个队列，数组 people 表示队列中一些人的属性（不一定按顺序）。每个 people[i] = [hi, ki] 表示第 i 个人的身高为 hi ，前面 正好 有 ki 个身高大于或等于 hi 的人。

  请你重新构造并返回输入数组 people 所表示的队列。返回的队列应该格式化为数组 queue ，其中 queue[j] = [hj, kj] 是队列中第 j 个人的属性（queue[0] 是排在队列前面的人）。
*/

/* 
  输入：people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
  输出：[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]

  解释：
  编号为 0 的人身高为 5 ，没有身高更高或者相同的人排在他前面。
  编号为 1 的人身高为 7 ，没有身高更高或者相同的人排在他前面。
  编号为 2 的人身高为 5 ，有 2 个身高更高或者相同的人排在他前面，即编号为 0 和 1 的人。
  编号为 3 的人身高为 6 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
  编号为 4 的人身高为 4 ，有 4 个身高更高或者相同的人排在他前面，即编号为 0、1、2、3 的人。
  编号为 5 的人身高为 7 ，有 1 个身高更高或者相同的人排在他前面，即编号为 1 的人。
  因此 [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] 是重新构造后的队列。
*/

/**
 * @param {number[][]} people
 * @return {number[][]}
 */

// 猜想1 排序
/* 
先按 身高h排序一次 (身高从大到小)， 同身高h,则k小在前 ([4, 0] 和 [4, 1])
再按 k调整一次，将后面元素按k，插入对应的k位置
*/

// 猜想2 放置 (插入) 
// [h, k]  k 就是插入的index  同h时，必须先插入小的k

// 先找到身高最高的 h = 7  [7, 0], [7, 1]
// [[7, 0]] -> [[7, 0], [7, 1]]

// 再找到身高次高的 h = 6  [6, 1]
// [[7, 0], [6, 1], [7, 1]]

// 再找到身高次高的 h = 5  [5, 0] [5, 2] 
// (必须先放[5, 0], 再放[5, 2])
// [[7, 0], [6, 1], [7, 1]]
// [[5, 0], [7, 0], [6, 1], [7, 1]]
// [[5, 0], [7, 0], [5, 2], [6, 1], [7, 1]]

// 如果按照 [5, 2] [5, 0] 这样的顺序放置，就不对了
// [[7, 0], [6, 1], [7, 1]]
// [[7, 0], [6, 1], [5, 2], [7, 1]] 
// [[5, 0], [7, 0], [6, 1], [5, 2], [7, 1]] (这是错误的结果)

var reconstructQueue = function(people) {
  const hToPersonMap = {};
  people.forEach(item => {
    const [h] = item;
    hToPersonMap[h] = hToPersonMap[h] || [];
    hToPersonMap[h].push(item);
  })

  const hArr = Object.keys(hToPersonMap);
  hArr.sort((a, b) => b - a); // 身高排序，从高到低

  const res = [];
  hArr.forEach(h => {
    const hPeople = hToPersonMap[h];
    hPeople.sort(([, a], [, b]) => a - b); // k排序，从小到大
    hPeople.forEach(person => {
      const [, k] = person;
      res.splice(k, 0, person);
    })
  })

  return res;

};


// 猜想1和猜想2是同样的思路，猜想1是在实现上对猜想2的优化
var reconstructQueue = function(people) {
  people.sort(([ha, ka], [hb, kb]) => {
    if (ha !== hb) {
      return hb - ha; // h 从高到低
    }
    return ka - kb; // 同h k从小到大
  })

  const res = []
  for (const person of people) {
    res.splice(person[1], 0, person);
  }
  return res;
};