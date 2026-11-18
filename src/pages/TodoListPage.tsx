import type { Todo } from "../App"
import TodoForm from "../components/todo/TodoForm"
import TodoList from "../components/todo/TodoList"

function TodoListPage({todos}:{todos:Todo[]}) {


  return (
    <>
    <TodoForm />
    <TodoList todos={todos}/>
    </>
 
  )
}

export default TodoListPage
