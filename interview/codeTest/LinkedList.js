class ListNode{
    constructor(val,next) {
        this.val = val === undefined? 0 : val;
        this.next = next === undefined? null: next;
    }
}
const listNode5 = new ListNode(5);
const listNode4 = new ListNode(4,listNode5);
const listNode3 = new ListNode(3,listNode4);
const listNode2 = new ListNode(2,listNode3);
const listNode1 = new ListNode(1,listNode2);

console.log(listNode1);
