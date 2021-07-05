//数组初始化
const colors = new Array();
const colors1 = [];

//添加元素到尾部
colors.push("red");

//添加元素到头部
colors.unshift("yellow");

//删除数组末尾元素
colors.pop();

//删除数组头部元素
colors.shift();

//删除数组任意位置元素
colors.splice(1,1);

console.log(colors);
