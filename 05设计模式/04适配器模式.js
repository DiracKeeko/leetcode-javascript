// 适配器模式
/* 
  定义：
    适配器模式将一个类的接口转换成客户希望的另外一个接口。
    适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。
*/

// 有如下三种格式的数据
//格式1
const data1 = [{ age1: 20, name1: "阿猫" }];
//格式2
const data2 = [{ age2: 12, name2: "阿狗" }];
//格式3
const data3 = [{ age3: 11, name3: "熊大" }];

// 目标数据格式
const targetData = [
  {
    age: 0,
    name: "",
  },
];

// 需要对每一种数据新建一个Adapter类
class Adapter1 {
  constructor(data) {
    this.data = data;
  }
  getTargetData() {
    return this.data.map((item) => {
      return {
        age: item.age1,
        name: item.name1,
      };
    });
  }
}

class Adapter2 {
  constructor(data) {
    this.data = data;
  }
  getTargetData() {
    return this.data.map((item) => {
      return {
        age: item.age2,
        name: item.name2,
      };
    });
  }
}

class Adapter3 {
  // ...
}

const adapter1 = new Adapter1(data1);
const formattedData = adapter1.getTargetData();



// 上面的例子用策略模式也能实现。 再来一个例子
// 温度转换器，将摄氏度转换为华氏度。

// 以摄氏度为单位的接口
class CelsiusTemperature {
  constructor(value) {
    this.value = value;
  }

  getCelsius() {
    return this.value;
  }
}

// 以华氏度为单位的接口
class FahrenheitTemperature {
  constructor(value) {
    this.value = value;
  }

  getFahrenheit() {
    return this.value;
  }
}

// 适配器
class TemperatureAdapter {
  constructor(celsiusTemperature) {
    this.celsiusTemperature = celsiusTemperature;
  }

  getFahrenheit() {
    const celsius = this.celsiusTemperature.getCelsius();
    const fahrenheit = (celsius * 9) / 5 + 32;
    return fahrenheit;
  }
}

// 测试适配器
const celsiusTemp = new CelsiusTemperature(30); // 摄氏度为 30 度
const adapter = new TemperatureAdapter(celsiusTemp); // 使用适配器将摄氏度转换为华氏度

const fahrenheit = adapter.getFahrenheit(); // 获取华氏度
console.log(`华氏温度：${fahrenheit.toFixed(2)}°F`); // 输出：华氏温度：86.00°F
