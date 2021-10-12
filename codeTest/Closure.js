// 没有运行前的静态场景下，function在那里定义的，值在哪里取。如果在当前定义域取不到，就去当前定义域上级的值
//取值的时候是看function在哪声明，而不是在哪调用
const number = 1;
function foo() {
  console.log(number);
}
function bar(fn) {
  const number = 2;
  fn();
}
bar(foo); // 1


//运用closure来形成 类似java私有变量的形式
function createCounter() {
    let counter = 0;
    const increment = () => {
      counter++;
    };
    const getCount = () => {
      return counter;
    };
    return {
      increment,
      getCount,
    };
  }
  const counter = createCounter();
  counter.increment();
  console.log(counter.getCount());

//   立即执行函数
// function() {}() 用圆括号抱起来，不然IDE不知道什么意思
(function(){
    
}())