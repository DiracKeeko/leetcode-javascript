// 单例模式
/* 
  1. 单例模式的定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
    (一个类 -> 一个实例 -> 全局都用这个实例)
  
  2. 场景举例
    vuex 和 redux中的store
    数据库连接池
    浏览器的 localStorage
    浏览器的 sessionStorage
*/

class Singleton {
  constructor() {
    // 私有构造函数，确保不能直接实例化
    if (!Singleton.instance) {
      // 只有在实例不存在时才创建实例
      this.data = []; // 这里可以存储需要共享的数据
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  static getInstance() {
    // 提供访问实例的静态方法
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  // 其他方法...
}

const instance1 = new Singleton(); // 不推荐这样使用，因为构造函数可能不允许多次实例化
console.log("instance1->", instance1);

const instance2 = Singleton.getInstance(); // 推荐使用静态方法获取实例
console.log("instance2->", instance2);

console.log(instance1 === instance2); // true，这两个实例是同一个实例

console.log("=====End=====");


class SingletonB {
  constructor() {
    // 这种写法是不允许创建多个实例，如果创建了多个实例，则抛出异常。
    if (SingletonB.instance) {
      throw new Error("实例已存在");
    }
    
    this.data = []; // 这里可以存储需要共享的数据
    SingletonB.instance = this;
    return SingletonB.instance;
  }

  static getInstance() {
    // 提供访问实例的静态方法
    if (!SingletonB.instance) {
      SingletonB.instance = new SingletonB();
    }
    return SingletonB.instance;
  }
}

const instanceB1 = new SingletonB();
console.log("instanceB1->", instanceB1);

const instanceB2 = new SingletonB();
console.log("instanceB2->", instanceB2); // 报错