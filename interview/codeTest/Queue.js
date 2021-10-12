class Queue{
    constructor() {
        this.data = [];
        this.tail = 0;
    }
    //往队列尾部加入元素
    enqueue(element){
        this.data[this.tail] = element;
        this.tail = this.tail + 1;
    }
    //删除队列头部元素
    dequeue(){
        this.tail = this.tail - 1;
        return this.data.shift();
    }
    //查看队列长度
    length(){
        return this.tail;
    }
    //查看队列是否为空
    isEmpty(){
        return this.tail === 0;
    }
    //获得队列头部元素
    front(){
        return this.data[0];
    }
}

const queue = new Queue();
queue.enqueue("A");
queue.enqueue("B");
console.log(queue.length());
console.log(queue.front());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.isEmpty());
