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
