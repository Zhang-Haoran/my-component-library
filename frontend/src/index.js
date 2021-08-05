import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import "./normalize.css"
import App from "./App"
import store from "./redux/store"
import * as type from "./redux/type"
//这里是发送端，在这里发送action，也需要用type里的actionType，来确保view和store两边通讯的type是一一对应的，进行沟通

let bookNumber = 1
let published = false
//订阅用于监控state是否已经改变，如果已经state改变将触发，下面的操作
store.subscribe(() => {
  console.log(store.getState()) //将state打印出来
  //没法直接console state，只能用getstate访问reducer
})

//addbook 监听器
const addBook = () => {
  const bookName = `New Book ${bookNumber++}`
  published = !published
  //开始分发action，view往store传action
  store.dispatch({
    type: type.ADD_BOOK, //action的type要和reducer对应，才能识别，必写项！！！
    info: {
      bookName: `<<${bookName}>>`,
      description: bookName,
      published: published,
      //这些数据将被用于改变state的数值
    },
  })
}

const delBook = () => {
  store.dispatch({
    type: type.DEL_BOOK,
    info: {
      id: getInput(),
    },
  })
}

const getInput = () => {
  return parseInt(Input.value)
}
const inputNumber = (event) => {
  const code = event.charCode >= 48 && event.charCode <= 57
  return code
}

//添加book 按钮
const Addbutton = document.createElement("button")
Addbutton.innerText = "Add book"
Addbutton.addEventListener("click", addBook)
//删除book 按钮
const Delbutton = document.createElement("button")
Delbutton.innerText = "Delete book"
Delbutton.addEventListener("click", delBook)
//具体要删除哪个book id
const Input = document.createElement("input")
Input.addEventListener("keypress", inputNumber)
//显示所有book 列表
const List = document.createElement("ol")

ReactDOM.render(<App />, document.getElementById("root").appendChild(Addbutton))
