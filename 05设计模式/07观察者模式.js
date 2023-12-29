// 观察者模式
/* 
  观察者模式中sub是被观察者，而observer是观察者。
  Subject和Observer互相依赖
*/
class Subject {
  constructor() {
    this.count = 0;
    this.observers = [];
  }
  getCount() {
    return this.count;
  }
  setCount(count) {
    this.count = count;
    this.notify();
  }
  notify() {
    this.observers.forEach((o) => {
      o.update();
    });
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
}

class Observer {
  constructor(name, sub) {
    this.name = name;
    this.subject = sub;
    this.subject.addObserver(this); // 这里的this是observer的实例
  }
  update() {
    console.log(this.name + "更新了，当前值：" + this.subject.getCount());
  }
}

const sub = new Subject();

const observer1 = new Observer("一号", sub); 
const observer2 = new Observer("二号", sub); 
// observer理解为视图, sub改变之后，会通知observer视图改变

sub.setCount(1);
// 一号更新了，当前值：1
// 二号更新了，当前值：1