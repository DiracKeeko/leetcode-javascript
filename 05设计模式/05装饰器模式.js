// 装饰器模式
/* 
  定义:
    装饰器模式（Decorator Pattern）是一种结构型设计模式，
    它允许向对象动态地添加新功能，而不会改变原有对象的结构。
    
    装饰器模式通过将对象放置在包装器中来实现，这样每个包装器都可以给原对象添加一些新的功能。
*/

/* 
  装饰器模式的使用场景
  1、 日志记录
  2、 权限控制
  3、 缓存
  4、 动态配置
 */

class Man {
  say() {
    console.log("我是一个普通人");
  }
}

// 出租车司机类
class TaxiDriverDecorator {
  constructor(man) {
    this.man = man;
  }
  say() {
    this.man.say();
    console.log("我还是一个出租车司机");
  }
}

const man = new Man();
const taxiDriverDecorator = new TaxiDriverDecorator(man);

man.say();
console.log("-----------");
taxiDriverDecorator.say();

// 第二个例子
// 咖啡接口
class Coffee {
  cost() {
    return 10;
  }
}

// 牛奶装饰器
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 5;
  }
}

// 糖装饰器
class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 3;
  }
}

// 测试装饰器
let myCoffee = new Coffee(); // 基本咖啡
myCoffee = new MilkDecorator(myCoffee); // 添加牛奶
myCoffee = new SugarDecorator(myCoffee); // 再添加糖

console.log(myCoffee.cost()); // 输出：18，咖啡加牛奶加糖的总价格


