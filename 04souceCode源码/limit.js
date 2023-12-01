// 异步任务的并发量控制

/* 
  最简单版本的问题
    要求多个请求，依次执行
    把请求放入列表中，用await来等待
 */
/* 
async function runTask(taskArr) {
  const resArr = [];
  for (let i = 0; i < taskArr.length; i++) {
    const res = await taskArr[i];
    resArr.push(res);
  }
  return resArr;
}
 */

/* 
  困难版本的问题 通过limit函数控制并发数。
  
  即: 可以同时执行n个异步任务，如果1个异步任务结束(同时执行任务数变为n - 1)，则再次加入1个异步任务。
    直到所有的任务都结束
*/

/* 
// 一个可用的模拟函数 sleep(n)
async function sleep(n) {
  return new Promise((resolve) => {
    setTimeout(resolve, n * 1000);
  });
}
 */

// 如果需要传递多个参数
async function sleep(n, name = "test") {
  return new Promise((resolve) => {
    console.log("start->", { n, name });
    // setTimeout的第一个参数是一个函数，用匿名函数来传递里面的带参resolve。
    setTimeout(() => {
      console.log("end->", { n, name }, "--------");
      // 而resolve又只能接受一个参数，所以用对象的方式来传递
      resolve({ n, name });
    }, n * 1000);
  });
}

async function start() {
  const runner = limit(2); // 并发量 3
  let tasks = [
    () => sleep(1, "吃饭"),
    () => sleep(3, "睡觉"),
    () => sleep(5, "打游戏"),
    () => sleep(3.5, "学算法"),
    () => sleep(2, "学源码"),
  ].map(runner);

  /* 
  // 下面这段代码和上面的代码执行结果非常不同
  let tasks = [
    () => sleep(1, "吃饭"),
    () => sleep(3, "睡觉"),
    () => sleep(5, "打游戏"),
    () => sleep(3.5, "学算法"),
    () => sleep(2, "学源码"),
  ]
  tasks.map(runner);
  */

  let result = await Promise.all(tasks);
  console.log("result->", result)
  console.log("===end===");
}

start();

// 实现function limit
function limit(maxCount) {
  // 存储队列 [4, 5]
  // 进行中队列 [1, 2, 3]

  const queue = []; // 存储队列 shift + pop 实现
  let activeCount = 0;

  const next = () => {
    // 下一个任务
    activeCount -= 1;
    if (queue.length > 0) {
      queue.shift()();
    }
  };

  const run = async (fn, resolve, args) => {
    // 执行一个函数
    activeCount += 1;
    const result = (async () => fn(...args))(); // fn可能是异步也可能不是异步，都用异步的方式处理
    resolve(result);
    await result;
    next();
  };

  const push = async (fn, resolve, args) => {
    queue.push(run.bind(null, fn, resolve, args));
    if (activeCount < maxCount && queue.length > 0) {
      // 执行数没满，且存储队列中还有任务，启动任务
      queue.shift()();
    }
  };

  let runner = (fn, ...args) => {
    return new Promise((resolve) => {
      push(fn, resolve, args);
    });
  };
  return runner;
}
