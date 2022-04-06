class Stack {
  constructor() {
    this.data = [];
    this.top = 0;
  }
  //往栈顶里添加元素
  push(element) {
    this.data[this.top] = element;
    this.top = this.top + 1;
  }
  //查看栈的长度
  length() {
    return this.top;
  }
  //获得栈顶的元素
  peek() {
    return this.data[this.top - 1];
  }
  //查看栈是否为空
  isEmpty() {
    return this.top === 0;
  }
  //删除栈顶的元素
  pop() {
    this.top = this.top - 1;
    return this.data.pop();
  }
}

const stack = new Stack();
stack.push('A');
stack.push('B');
console.log(stack.length());
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.isEmpty());
