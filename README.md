# ES6易混点总结

## 知识点1：var, let, const

### var

#### scope

变量在代码中可以取到的范围

globe scope: 变量声明在文件里

function scope(local scope): 变量声明在函数里

block scope: 块级作用域

var is function scoped, it means if the variable is declared within a function, it can be accessed within the function. Similarly, if var is used outside of the function, the variable can be accessed in via window object. (in the browser)

#### var 可以对同一个变量re-declare 和 update

```
var fruit = 'apple';
var fruit = 'pear'
```

#### Hoisting 变量提升

当在函数中声明变量或者函数时，这个函数或者变量都会被提升到当前文件的最上面，被初始化但是没有被赋值

```
console.log(fruit); // undefined
var fruit = 'apple'
```

#### var 所带来的问题

```
var fruit = 'apple';
if(true){
	var fruit = 'pear';
}
console.log(fruit); //pear
```

fruit被修改，照理来说fruit的结果应该仍为apple。会带来潜在问题，如果有很多文件，在A文件的变量在B文件被修改。会导致A的值在不知情情况下被修改，从而报错。

### let

#### scope

let is block scoped. A block is a chunk of code wrapped by currly brackets `{}` for example: 

`function() {// this is a block} 函数是块级作用域`

`if(true) {// this is also a block} if语句是块级作用域`

object{} 不是块级作用域！！！

#### let 不能对同一个变量进行re-declare 和 update

#### Hoisting 变量提升

let 的变量创建过程被提升了，但初始化没被提升

```
console.log(fruit); // Uncaught ReferenceError: Cannot access 'fruit' before initialization
```

注意： 如果创建过程没被提升的话，报错信息应该是

```
// Uncaught ReferenceError: fruit is not defined
```

### const

#### scope

same as let

#### const无法对常量进行修改，但是object和array里内容可以修改

passed by reference

object, array

passed by value

number, boolean, string, null, undefined, symbol

```
const fruit = {name: 'apple', color: 'red'};
fruit.color = 'green';
console.log(fruit); // {name:'apple', color:'green'}
```

之所以能改变fruit object的值，是因为改变的是引用地址上的值，而它的引用地址没有修改

fruit ->ref -> {name:'apple', color:'red'}

## 知识点2：spread operator 延展操作符

```
const array = [1,2]
const newArray = [...array, 3, 4]
console.log(newArray) // [1,2,3,4]
```

如果不用延展操作符，就必须这样写

```
const newArray = [array[0], array[1], 3, 4]

```

## 知识点3：函数声明和函数表达式

function expression 函数表达式

```
const add = function(x,y){
	return x+y
}

```

function declaration 函数声明

```
function add(x,y){
	return x+y
}
```

区别在于 体现在变量提升。

函数表达式不能在对他赋值之前，使用它。

函数声明是可以直接使用。

## 知识点4：Callback回调函数

给一个函数 传了另一个函数作为参数

```
function normalFunction(param){
	console.log(param);
}
function sum(x, y, callback){
	const total= x+ y;
	callback(sum);
}
sum(1,2,normalFunction);
```

setTimeout(callback, 1000);

就是典型的回调函数运用于异步的例子

## 知识点5：Closure闭包

当在一个作用域取值时，发现这个值不在当前作用域，就会去它上级作用域取值

```
const number = 1;
function foo(){
	console.log(number)
}

```

函数作用域能访问到他的上级作用域里的number，就是一个典型例子

当你在一个函数里使用一个不在当前函数里声明的变量就是闭包。

每一个function在创建完，都会有一个closure

### 常见应用1： a function was passed to another function as param

```
const number = 1;
function foo(){
	console.log(number)
}
function bar(fn){
	const number = 2;
	fn();
}
bar(foo); // 1
```

当形成 closure时，会形成lexical scope: 词法作用域，closure的取值是在当方程声明完 但还没执行前的静态场景下

所以执行fn（）时，会执行foo（），而foo（）是写在全局作用域下的，所以当number找不到值时，会去函数声明的地方 即全局作用域里取，而不会去我们实际调用的地方，去bar里面取值

```
let number = 1;
function foo(){
console.log(number)
}
function bar(fn){
const number = 2;
fn();
}number = 100;
bar(foo); // 100 当number在foo()里取不到值时，就会去它上级作用域取值。foo()的上级作用域就是全局
```

### 常见应用2：a function was returned by another function

```
function foo(){
	const number = 1;
	return ()=>{
	console.log(number)
	}
}
const number = 100;
foo()(); //1
```

取值的时候，看到number没有值，就会去()=>{}的上级作用域取值，取到值为1

### 常见应用3： Immediately invoked function

```
(function(){}) (); // function() {} 用圆括号抱起来，不然IDE不知道什么意思
```

应用到了应用2所形成的闭包，内部变量不会对外部进行干扰

## 知识点6：This

根据当前的上下文context，来取相应的变量

this的值是动态的，只有在调用（实习执行）时才知道this值是什么

### this in normal function

```
function foo(){
	console.log(this);
}
foo(); // window
```

默认情况下，this在function里的指向，是调用function的对象，即window是他的上下文

即window.foo();

### this in normal function with call, apply, bind

call和apply类似，想要调用函数并且指定this指向

```
// a1, a2为参数格式
foo.call({number:1}) // this就是 {number:1}对象
// [a1, a2]为参数格式
foo.apply({number；2}) // this 就是 {number:2} 对象
// bind return new function
const bar = foo.bind({number:3});
bar(); // this就是{number: 3}对象

```

call和apply的区别是

call 第一个参数是this指向，第二个参数，第三个参数，乃至n个参数，是foo 接受的参数。参数以逗号隔开

apply从第二个参数开始，所有foo function的参数，以array形式放在一起

bind会返回新function，把新的function的this指向 我传入的对象

### this in an object and callback function

```
const calendar = {
  currentDay: 6,
  nextDay() {
    this.currentDay++;
    console.log(this.currentDay);
  },
};
calendar.nextDay();
```

```
const calendar = {
  currentDay: 6,
  nextDay() {
    setTimeout(function () {
      this.currentDay++;
      console.log(this.currentDay); // undefined
    });
  },
};
calendar.nextDay(); //NaN 
```

NaN的原因是因为想要给this.currentDay加一，但是this.currentDay 是undefined

在这里this指向了window，是因为setTimeout是由window调用的

```
const calendar = {
  currentDay: 6,
  nextDay() {
    setTimeout(function () {
      this.currentDay++;
      console.log(this.currentDay);
    }).bind(this)
  },
};
calendar.nextDay(); // 7
```

可以用bind来改正这个问题，手动把function（）{this.currentDay++; console.log(this.currentDay)}的this，手动指定到当前上下文的this。即调用nextday()的calendar

```
const calendar = {
  currentDay: 6,
  nextDay() {
    setTimeout(() => {
      this.currentDay++;
      console.log(this.currentDay);
    });
  },
};
calendar.nextDay(); //7
```

在arrow function里完全没有this指向，它在写下的这一刻，它的this指向完全依赖于 包裹它的上级作用域

他的上级作用域是调用nextDay()的calendar

```
const calendar = {
  currentDay: 6,
  normal: function () {
    console.log(1, this); // calendar
    setTimeout(function () {
      console.log(2, this); // window
    });
  },
  arrow: function () {
    console.log(3, this); // calendar
    setTimeout(() => {
      console.log(4, this); // calendar
    });
  },
};
calendar.normal();
calendar.arrow();
```
