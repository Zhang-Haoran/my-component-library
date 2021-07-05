class ListNode{
    constructor(val,next) {
        this.val = val === undefined? 0 : val;
        this.next = next === undefined? null: next;
    }
}
const listNode = new ListNode(1);
const listNode2 = new ListNode(2,listNode);
const listNode3 = new ListNode(3,listNode2);
const listNode4 = new ListNode(4,listNode3);
const listNode5 = new ListNode(5,listNode4);
