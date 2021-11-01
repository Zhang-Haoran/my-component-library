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

## 知识点7： Array operator

### Manipulation

对尾部修改: push, pop

对头部修改：shift, unshift

对中间修改：splice。

注：splice(x, y, newAdded)

```
const fruit = ['grape', 'apple', 'pear'];
fruit.splice(1, 1, 'watermelon', 'peach');
console.log(fruit); //  ['grape', 'watermelon','peach', 'pear']
```

在x index开始，删除y个元素，然后添加newAdded元素

### Iteration

#### for...of, for...in

for...of 取每一项的值

for..in 取每一项的index或者key （常用于object）

#### forEach

callback会接受array里面的每一项，对其进行操作

```
const fruits = ['apple','pear']
fruit.forEach((fruit,index) => console.log(fruit))
// apple
// pear
```

#### Map

生成一个和遍历数组等长度，处理过后的新数组

```
const fruits = ['apple', 'pear']
const newFruits = fruits.map((fruit) => ({
	name: fruit,
	price: 10
}))
```

#### Reduce

根据array里每一项，以某种算法合并在一起

```
const numbers = [1, 2, 3]
const sum = numbers.reduce((accumulator, number) => accumulator + number, 0) 
// number 是numbers array里的项， accumulator是上一次callback被调用时，它返回的内容, 0为第一次执行callback时accumulator的值
console.log(sum) // 6
```

第一次执行reduce时，accumulator初始值为0,number为1， 最终返回 0+1 =1

第二次执行reduce时，accumulator变为1因为上一次返回结果为1,number 为2，最终返回 1+ 2 =3

#### Fliter

根据筛选条件，对array每一项进行筛选，通过筛选的放入一个新array

```
const fruits = [
  {
    name: 'apple',
    color: 'red',
  },
  {
    name: 'pear',
    color: 'green',
  },
  {
    name: 'grape',
    color: 'green',
  },
];
const filteredFruits = fruits.filter((i) => i.color === 'green');
console.log(filteredFruits);
// [{name: "pear", color: "green"}, {name: "grape", color: "green"}]
```

#### Find

根据筛选条件，对array每一项进行筛选，一旦找到满足条件的立即返回该项，不再继续搜索

```
const fruits = [
  {
    name: 'apple',
    color: 'red',
  },
  {
    name: 'pear',
    color: 'green',
  },
  {
    name: 'grape',
    color: 'green',
  },
];
const greenFruit = fruits.find((i) => i.color === 'green');
console.log(greenFruit);
// {name: "pear", color: "green"}
```

## 知识点8: Set

set里的值是唯一的

```
const array = [1, 2, 2, 3, 4, 4];
const uniqueArray = [...new Set(array)]
console.log(uniqueArray); //[1, 2, 3, 4]
```

通过set可以帮array快速去重，用...把set转换回Array

# Angular 常用知识点总结

## 总览

### 基础构造块：NgModule

一个为组件提供编译上下文的容器，用于存放代码块。

这些代码块包括组件，服务提供者，作用域由NgModule定义。

可以导入其他模块的功能，和导出功能为其他模块使用。

Angular应用就是由一组NgModule定义出的。应用至少会有一个用于引导应用的根模块（AppModule，位于app.module.ts），和其他特性模块。

```
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 组件定义视图，组件使用服务

组件定义视图的的显示逻辑，组件使用服务提供的与视图不相关的功能如数据源。服务提供者作为依赖，注入到组件中

```
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
```

### 装饰器

模块，组件，服务都是使用装饰器的类，装饰器会标记它们的类型并提供元数据。

模块

```
@NgModule()
```

组件

```
@Component(）
```

服务

```
@Injectable（）
```

### 元数据

将组件类和定义视图的模板相关联。

```
@Component({
selector: 'app-messages',
templateUrl: './messages.component.html',
styleUrls: ['./messages.component.scss']
})
```

### 模板

把HTML与Angular指令相组合，在渲染HTML之前，修改HTML。

```
<div *ngIf="messageService.messages.length">
  <h2>Message</h2>
  <button class="clear" (click)="messageService.clear()">Clear message</button>
  <div *ngFor="let message of messageService.messages">{{message}}</div>
</div>

```

### 路由

定义视图间导航路径。

```
const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  {path: '', redirectTo:'/dashboard', pathMatch:'full'}
];
```

## 知识点1：模块

## 知识点2：组件

## 知识点3：模板

## 知识点4：元数据

## 知识点5：数据绑定

## 知识点6：指令

## 知识点7：服务

## 知识点8：依赖注入

## 知识点9：路由

## 知识点10： SSR

# 面试经验总结

## Yep Innovation Pty Ltd

### Phone screening

12/10/2021上午投的简历，下午一个叫eva的hr电话打过来。先是做个自我介绍，问我为什么要跳槽，现在所在的公司的团队规模和技术栈，问了一下签证状态和期待薪资。简单介绍了一下他们公司，然后问我还有什么问题需要问。总时长14分钟。加了下微信。安排了14号和老总面试

### 老总面

14/10/2021下午4点，tony总zoom面试。先做自我介绍，问了我一下为什么要跳槽，问我知不知道区块链，vr或者ar技术。简单聊了一聊，然后安排了下一场技术面。

### 技术面

18/10/2021下午三点，IT部的打了个电话来面试。先做自我介绍，然后问我css的flexbox的概念和用法，justify-content怎么用。然后问我前端路由和后端路由假如写的完全一样，那会先进前端还是后端。然后问我jwt token比对session的优缺点。后端部署软件用的是什么。现在的项目后端往前端传数据有没有加密。在写现在的项目的时候遇到了什么技术问题，怎么解决的。问了一下期待薪资和签证状态。

## RMIT Online

### Phone screening

25/10/2021下午3点钟来的电话，叫Yasmin。 上来先问对我们RMIT online了解多少。然后问我为什么要跳槽。问我为什么要投这个岗位，哪里吸引你了。然后根据JD来问我的技术栈，前端React，后端node.js。部署AWS。有没有agile经验。在现在的企业里面做什么。问了下我总共多少年经验，期待薪资，工作多数remote和一天onsite可不可以接受。最后问了我一下visa状态。说周五或者下周一给我回复
