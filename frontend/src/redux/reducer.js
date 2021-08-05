import * as type from "./type"

let bookID = 1

const initState = [
  {
    id: 0,
    bookName: "Just Test",
    description: "Just Test",
    published: false,
  },
  //   {
  //       新添加的书在这
  //   }
]

//reducer是一切的开始，他是一系列的规则
//先往里传一个state，在传入之前，开始的state长啥样？ 需要自己定义初始化initState。
//然后view 会给一个action，根据这个action来查找reducer里的一系列规则，根据规则来处理 state
export default function reducer(state = initState, action) {
  //reducer里面有个state，只能用getState访问
  switch (action.type) {
    //加一本书的规则
    case type.ADD_BOOK:
      return [
        ...state, //先把原来的state展开，随后在尾部添加一个新的object，组成新的state。
        {
          id: bookID++, //先使用id后相加，一开始就会是1. 如果是++BookID，就变成了先相加后使用，上来就是2
          bookName: action.info.bookName,
          description: action.info.description,
          published: action.info.published,
        },
      ]
    //删除一本书的规则
    case type.DEL_BOOK:
      return state.filter((book) => book.id !== action.info.id) //bookid和所选的actionid一样的就被删掉，只保留bookid和所选的actionid不一样的
    default:
      //不做任何操作，也得返回原本的state，不然state会丢失
      return state
  }
}
//就是一个函数，生成了一个规则
