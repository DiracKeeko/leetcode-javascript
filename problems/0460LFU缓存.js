/*
 * [460] LFU 缓存
 */

/* 
  请你为 最不经常使用（LFU）缓存算法设计并实现数据结构。
*/

/* 
  实现 LFUCache 类：

  LFUCache(int capacity) - 用数据结构的容量 capacity 初始化对象

  int get(int key) - 如果键 key 存在于缓存中，则获取键的值，否则返回 -1 。
  
  void put(int key, int value) - 如果键 key 已存在，则变更其值；如果键不存在，请插入键值对。当缓存达到其容量 capacity 时，则应该在插入新项之前，移除最不经常使用的项。在此问题中，当存在平局（即两个或更多个键具有相同使用频率）时，应该去除 最久未使用 的键。

  为了确定最不常使用的键，可以为缓存中的每个键维护一个 使用计数器 。使用计数最小的键是最久未使用的键。

  当一个键首次插入到缓存中时，它的使用计数器被设置为 1 (由于 put 操作)。对缓存中的键执行 get 或 put 操作，使用计数器的值将会递增。

  函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
*/

// v1 主要是用Object来实现
/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
  this.size = capacity;
  this.values = {}; // key: value
  this.times = {}; // key: 次数
  
  // 次数计数器
  // (useMap的更新逻辑与vue响应式的依赖管理逻辑很像)
  this.useMap = {}; // 次数: key 使用Set()
  this.min = 0; // 记录最小次数
};  

// 额外增加一个辅助函数
LFUCache.prototype.updateCount = function(key) {
  let curTime = this.times[key];
  let curTimeSet = this.useMap[curTime];
  // ↓ 当前key是使用次数最少的，且同次数的key只有一个
  if (this.min === curTime && curTimeSet.size === 1) {
    this.min += 1;
  }

  curTime += 1;
  curTimeSet.delete(key);
  curTimeSet = this.useMap[curTime] || new Set();
  curTimeSet.add(key);
  this.useMap[curTime] = curTimeSet;
  this.times[key] = curTime;
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
  if (this.values[key] !== undefined) {
    this.updateCount(key);
    return this.values[key];
  }
  return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
  if (this.size === 0) {
    return;
  }

  if (this.values[key] !== undefined) {
    // 值存在，不需要淘汰
    this.values[key] = value;
    this.updateCount(key);
  } else {
    // 值不存在，需要看size
    if (this.size === Object.keys(this.values).length) {
      // 已经存满了，需要淘汰
      let minSet = this.useMap[this.min];
      let minKeyOldest = minSet.keys().next().value; // 获取最早放入set的值

      minSet.delete(minKeyOldest);
      delete this.times[minKeyOldest];
      delete this.values[minKeyOldest];
    }

    // 更新值
    this.values[key] = value;
    const curTimeSet = this.useMap[1] || new Set();
    curTimeSet.add(key);
    this.useMap[1] = curTimeSet;
    this.times[key] = 1;
    this.min = 1;
  }
};


// ↑ 上面这个v1 用 Object + Set 的实现 连续put 在测试用例22/25多个连续put操作会超时

// v2 ↓ 改用 Map + Set实现
var LFUCache = function(capacity) {
  this.size = capacity;
  this.values = new Map(); // key: value
  this.times = new Map(); // key: 次数
  
  // 次数计数器
  // (useMap的更新逻辑与vue响应式的依赖管理逻辑很像)
  this.useMap = new Map(); // 次数: key 使用Set()
  this.min = 0; // 记录最小次数
};  

// 额外增加一个辅助函数
LFUCache.prototype.updateCount = function(key) {
  let curTime = this.times.get(key);
  let curTimeSet = this.useMap.get(curTime);
  // ↓ 当前key是使用次数最少的，且同次数的key只有一个
  if (this.min === curTime && curTimeSet.size === 1) {
    this.min += 1;
  }

  curTime += 1;
  curTimeSet.delete(key);
  curTimeSet = this.useMap.get(curTime) || new Set();
  curTimeSet.add(key);
  this.useMap.set(curTime, curTimeSet);
  this.times.set(key, curTime);
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
  if (this.values.has(key)) {
    this.updateCount(key);
    return this.values.get(key);
  }
  return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
  if (this.size === 0) {
    return;
  }

  if (this.values.has(key)) {
    // 值存在，不需要淘汰
    this.values.set(key, value);
    this.updateCount(key);
  } else {
    // 值不存在，需要看size
    if (this.size === this.values.size) {
      // 已经存满了，需要淘汰
      let minSet = this.useMap.get(this.min);
      let minKeyOldest = minSet.keys().next().value; // 获取最早放入set的值

      minSet.delete(minKeyOldest);
      this.times.delete(minKeyOldest);
      this.values.delete(minKeyOldest);
    }

    // 更新值
    this.values.set(key, value);
    const curTimeSet = this.useMap.get(1) || new Set();
    curTimeSet.add(key);
    this.useMap.set(1, curTimeSet);
    this.times.set(key, 1);
    this.min = 1;
  }
};

/* 
  v2 可以AC
    所以有连续的put操作，应该用Map取代Object 
 */