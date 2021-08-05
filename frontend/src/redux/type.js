//定义action的type，之后会用这些type来对应查找reducer里的规则
export const ADD_BOOK = "addbook"
export const DEL_BOOK = "delbook"

//为什么单独定义一个文件出来，而不写死？
//方便共享和修改使用的。在reducer和view里 都会用到这里的动作名称。如果一处修改，另一处可能会对不上，所以就共同在这里定义一个常量。
