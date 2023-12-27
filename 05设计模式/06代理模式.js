// 代理模式
/* 
  定义：
    代理模式是通过引入一个代理对象来控制对另一个对象的访问。
    代理对象充当了客户端和目标对象之间的中介，可以用于实现各种用途，如延迟加载、权限控制、日志记录等。
  
  好处：
    可以在在代理的这一环节做控制操作(拒绝访问，过滤 等等)
*/


// MDN 上的例子 
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
// ### get 代理
const handler = {
  get: function (obj, prop) {
    return prop in obj ? obj[prop] : 37;
  },
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); // 1, undefined
console.log("c" in p, p.c); // false, 37

// ### 无操作转发代理
// 在以下例子中，我们使用了一个原生 JavaScript 对象，代理会将所有应用到它的操作转发到这个对象上。
let target = {};
let p1 = new Proxy(target, {});

p1.a = 37; // 操作转发到目标

console.log(target.a); // 37. 操作已经被正确地转发


// ### 验证代理
let validator = {
  set: function(obj, prop, value) {
    if (prop === "age") {
      if (!Number.isInteger(value)) {
        throw new TypeError("The age is not an integer")
      }
    }
    if (value > 200) {
      throw new RangeError("The age seems invalid")
    }

    obj[prop] = value;

    // Proxy 的 set 方法预期返回一个布尔值，用于指示是否成功设置了属性。
    return true;
  }
}

let person = new Proxy({}, validator);

person.age = 100;

console.log(person.age);
// 100

// person.age = "young";
// 抛出异常：Uncaught TypeError: The age is not an integer

person.age = 300;
// 抛出异常：Uncaught RangeError: The age seems invalid