import type { Dispatch, SetStateAction } from "react"
import type { Todo } from "../App"
import TodoForm from "../components/todo/TodoForm"
import TodoList from "../components/todo/TodoList"

function TodoListPage({todos,setTodos}:{
  todos:Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
}) {


  return (
    <>
    <TodoForm setTodos={setTodos} />
    <TodoList todos={todos} setTodos={setTodos}/>
    </>
 
  )
}

export default TodoListPage
