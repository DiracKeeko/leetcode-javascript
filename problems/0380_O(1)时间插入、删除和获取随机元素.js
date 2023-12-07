/*
 * [380] O(1) 时间插入、删除和获取随机元素
 */

/* 
  实现RandomizedSet 类：

  RandomizedSet() 初始化 RandomizedSet 对象

  bool insert(int val) 当元素 val 不存在时，向集合中插入该项，并返回 true ；否则，返回 false 。

  bool remove(int val) 当元素 val 存在时，从集合中移除该项，并返回 true ；否则，返回 false 。
  
  int getRandom() 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。每个元素应该有 相同的概率 被返回。

  你必须实现类的所有函数，并满足每个函数的 平均 时间复杂度为 O(1) 。
*/

// 分析：每个函数的时间复杂度为 O(1)
// 考虑存储的时候用什么数据结构。 用Array -> 容易实现getRandom(). 但是Array在remove的时候是一个O(n)
// 因此选中Array，但是要在remove的时候优化

var RandomizedSet = function () {
  this.arr = [];
  this.map = {}; // 记录 val -> index
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (val in this.map) {
    return false;
  }
  this.arr.push(val);
  this.map[val] = this.arr.length - 1;
  return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (val in this.map) {
    const curIndex = this.map[val];
    const lastIndex = this.arr.length - 1;
    const lastVal = this.arr[lastIndex];

    // 维护lastVal的index
    this.map[lastVal] = curIndex;
    delete this.map[val];

    // 交换位置，删除尾部
    this.arr[curIndex] = lastVal;
    this.arr.pop();

    return true;
  }
  return false;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const ri = Math.floor(Math.random() * this.arr.length);
  return this.arr[ri];
};
