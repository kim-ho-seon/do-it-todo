import TodoForm from "../components/todo/TodoForm"
import TodoList from "../components/todo/TodoList"

function TodoListPage({todos}) {


  return (
    <>
    <TodoForm />
    <TodoList todos={todos}/>
    </>
 
  )
}

export default TodoListPage
