/* 
  请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
  实现 LRUCache 类：
  LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
  int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
  void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。

  函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
*/

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.cache = new Map();
  this.max = capacity;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    let temp = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, temp); // 将项再次存入 Map ，表示最近使用
    return temp;
  }
  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key); // 删除已存在的项，表示更新值并最近使用
  } else if (this.cache.size >= this.max) {
    // this.cache.keys().next().value;  获取第一个添加进cache的数据
    this.cache.delete(this.cache.keys().next().value);
  }
  this.cache.set(key, value);
};
