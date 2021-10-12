// This 问题 就是 我是谁？的问题
// function 谁是caller，this就是谁。雇佣兵
// 箭头函数 我在哪定义，this就指向定义它的那个 作用域。 不可以被绑定。因为它相当于定义完一个function，直接被绑定。
// 单纯Object{}不能形成块级作用域
// 箭头函数找作用域，包裹arrow function的上一级指向的是谁，就是谁
"use strict"

const haoran = {
    name: "haoran",
    climbing: function (){
        console.log(this);
    },
    cycling: ()=>{
        console.log(this);
    }

}

haoran.climbing();
// { name: 'haoran', climbing: [Function: climbing] }这里的this指代的是方程caller， ming本身

function climbing1(){
    console.log(this);
}

climbing1();
// undefined 这里的this，代指undefined因为方程没有caller去调用

const cycling1 = () =>{
    console.log(this);
}

cycling1();
// {} 这里的this，代指global{}，因为他的作用域在整个程序里

haoran.cycling();
// {} 这里的this，代指global{}，因为他的作用域在整个程序里， ming{}不是作用域,只是object的囊括

//高级
function start(a,b,c){
    console.log("start： ",this,a,b,c);
}

const stop = ()=>{
    console.log("stop： ",this);
}

function climbing(){
    console.log("new climbing的结果: ",this);
    start();
    stop();
    //解决了，需要bind过后才能执行的问题。
    // start.call({name:"haoran"},1,2,3);//直接执行，不需要先绑定，区别在于传参方法的问题。call，参数一个一个传
    // start.apply({name:"haoran"},[1,2,3]);//直接执行，不需要先绑定。apply，参数只能接两位，一位为this，一位为参数列表，按顺序一个一个往里传
}
const cycling = ()=>{
    console.log("new Cycling的结果: ", this);
    start();
    stop();
}

function person(){
    this.name = "haoran2"
    this.climbing = function (){
        console.log(this);
    }
    this.cycling = () =>{
        console.log(this);
    }
}

class Person{
    constructor(){
        this.name = "haoran3";
    }
    climbing(){
        console.log(this);
    }
    cycling = ()=>{
        console.log(this);
    }
}

const haoran2 = new person();
const haoran3 = new Person(); //箭头函数的作用域 在new之后变成了 Person而不是因为写在person{}里面的原因

haoran2.climbing(); /*person {
  name: 'haoran2',
  climbing: [Function (anonymous)],
  cycling: [Function (anonymous)]
}
*/
haoran3.climbing(); //Person { cycling: [Function: cycling], name: 'haoran3' }

haoran2.cycling(); /*person {
//   name: 'haoran2',
//   climbing: [Function (anonymous)],
//   cycling: [Function (anonymous)]
// }
// */
haoran3.cycling(); //Person { cycling: [Function: cycling], name: 'haoran3' }

//调用里面的方程
const outClimbing1 = haoran.climbing;
const outCycling1 = haoran.cycling;
outClimbing1(); //undefined 他没有caller
outCycling1(); // {} 作用域是整个程序

const outClimbing2 = haoran2.climbing;
const outCycling2 = haoran2.cycling;
outClimbing2(); // undefined
outCycling2(); /*person {
//   name: 'haoran2',
//   climbing: [Function (anonymous)],
//   cycling: [Function (anonymous)]
// }
// */

const outClimbing3 = haoran3.climbing;
const outCycling3 = haoran3.cycling;
outClimbing3(); //undefined 没有caller
outCycling3(); //Person { cycling: [Function: cycling], name: 'haoran3' } 被new限定了 作用域

//先定义里面方程，后调用
haoran.climbing = climbing;
haoran2.climbing = climbing;
haoran3.climbing = climbing;

haoran.cycling = cycling;
haoran2.cycling = cycling;
haoran3.cycling = cycling;

haoran.climbing(); //haoran
haoran.cycling();  //global{}，定义在外面
haoran2.climbing(); //haoran2
haoran2.cycling();  //global{}，定义在外面
haoran3.climbing(); //haoran3
haoran3.cycling();  //global{},根在外面


