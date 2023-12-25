// 策略模式
/* 
  定义: 
    策略模式定义了一系列的算法, 并将每个算法封装起来, 并且使它们可以相互替换, 且算法的改变不会影响使用算法的用户。

    策略模式属于行为型模式, 它是对算法的包装, 它把算法的行为包装在一个独立的类中, 并将行为的选择权交给客户端。
    
  通俗的说：
    定义一系列的函数，这些函数有着相同的入参类型和结果类型。用于处理同一个业务目标下的不同策略分支。
    把这些函数封装起来(可以封装在map中, array中)，把策略的选择权交给使用者。
*/

const doSomething = (age) => {
  if (age === 20) {
    // do something
  }
  if (age === 30) {
    // do something
  }
  if (age === 40) {
    // do something
  }
  // ...
};

// 上面 的函数，如果要处理不同年龄段的业务逻辑，就需要写很多 if else 语句，如果有10个年龄，那就需要写10个if分支

const strategyMap = {
  20: () => {
    // do something
  },
  30: () => {
    // do something
  },
  40: () => {
    // do something
  },
  //...
}

const doSomethingWithStrategyMap = (age) => {
  const strategy = strategyMap[age];
  if (strategy) {
    strategy();
  }
};