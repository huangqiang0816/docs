- _实现一个并发限制的异步调度器 Scheduler,保证同时运行的任务最多有两个._

```javascript
class Scheduler {
  constructor() {
    this.max = 2;
    this.tasks = []; // 执行中的
    this.pendings = [];
  }

  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      promiseCreator.finsh = resolve;
      if (this.tasks.length < this.max) {
        this.runTask(promiseCreator);
      } else {
        this.pendings.push(promiseCreator);
      }
    });
  }

  runTask(promiseCreator) {
    this.tasks.push(promiseCreator);
    promiseCreator().then(() => {
      promiseCreator.finsh();
      // 移除该函数
      this.removeTask(promiseCreator);
      if (this.pendings.length > 0) {
        this.runTask(this.pendings.shift());
      }
    });
  }
  // 这个地方需要这样处理吗？
  removeTask(promiseCreator) {
    this.tasks.splice(this.tasks.findIndex(promiseCreator), 1);
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
```
