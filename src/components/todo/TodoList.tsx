
function TodoList({todos}){

  return(
    <div className="todo-list">
      <ul className="check-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList
