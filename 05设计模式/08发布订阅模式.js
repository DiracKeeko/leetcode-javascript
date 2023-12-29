// 发布订阅模式

/* 
  区别于观察者模式，发布订阅模式更像是平台 发布者发布消息，订阅者订阅消息，两者通过平台交换信息。
 
  而观察者模式的observer和subject直接接触。
*/

class EventEmitter {
  constructor() {
    this.cache = {};
  }

  on(eventName, func) {
    const taskArr = this.cache[eventName];
    if (taskArr) {
      taskArr.push(func);
    } else {
      this.cache[eventName] = [func];
    }
  }

  off(eventName, func) {
    const taskArr = this.cache[eventName];
    if (taskArr) {
      const index = taskArr.indexOf(func);
      if (index > -1) {
        taskArr.splice(index, 1);
      }
    }
  }

  emit(eventName, ...args) {
    // 复制一份，放置回调函数里继续on，导致死循环
    const taskArr = this.cache[eventName].slice(0);
    if (taskArr) {
      for (const fn of taskArr) {
        fn(...args);
      }
    }
  }

  once(eventName, cb) {
    function fn(...args) {
      cb.apply(null, args);
      this.off(eventName, fn);
    }
    this.on(eventName, fn.bind(this));
  }
}

const eventBus = new EventEmitter();

// 像vue2中的eventBus一样

// 组件一
eventBus.on("test", function (a, b) {
  console.log(a, b);
});

// 想象成组件二
eventBus.emit("test", 1, 2);

console.log("eventBus->", eventBus);

// 想象为组件一
eventBus.once("event1", () => { console.log("嘿嘿")});
// console.log("eventBus->", eventBus);

// 想象为组件二
eventBus.emit("event1");
console.log("eventBus->", eventBus);

