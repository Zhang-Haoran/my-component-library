//接收端，store 是reducer的代理，真正操作者就是store，reducer只是store用来查询的规则
import { createStore } from "redux"
import reducer from "./reducer"
//根据reducer，造了一个store出来。此时store就具有根据action来查reducer去改变state,拥有reducer里所有规则
const store = createStore(reducer)

export default store
