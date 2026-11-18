
import { useNavigate, } from 'react-router-dom';
import './TodoList.css'
import type { Todo } from '../../App';
import type { Dispatch, SetStateAction } from 'react';

function TodoList({todos,setTodos}:{
  todos:Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
}){ 

  const navigate = useNavigate()

  const todoItems = todos.filter((todo) => !todo.isCompleted);
  const doneItems = todos.filter((todo) => todo.isCompleted);
  const toggleTodo = (id: number) => {
    setTodos((prev)=>
      prev.map((todo)=> 
        todo.id === id? {...todo, isCompleted: !todo.isCompleted} : todo))} 
  
  return(
    <div className="todo-list">
      <div className="todo-section">
        <h2>
          <img src="src\assets\images\todo@3x.png" alt="TO DO" />     
        </h2>

        {todoItems.length > 0 ? (
        <ul className="check-list">
          {/* 해야 할 일 */}
          {todoItems.map((todo) => (
            <li 
              key={todo.id} 
              className="todo-item"
              onClick={()=>navigate(`/items/${todo.id}`)}
            > <img 
              onClick={(e)=>{e.stopPropagation();toggleTodo(todo.id)}}
              src="src\assets\icon\Property 1=Default@3x.png" alt="" />{todo.name}
            </li>
          ))}
        </ul> 
        ):(
         <div className="empty-state">
          <img src="src\assets\images\Type=Todo, Size=Large@3x.png" alt="할 일이 없어요. 해야 할 일을 추가해주세요!" />
          <p>할 일이 없어요.</p>
          <p>TODO를 새롭게 추가해주세요!</p>
         </div>
         )}
         
      </div>

      <div className="done-section">
        <h2>
          <img src="src\assets\images\done@3x.png" alt="DONE" />
        </h2>
        {doneItems.length > 0 ? (
        <ul className="check-list">
          {/* 완료한 할 일 */}
          {doneItems.map((todo) => (
            <li key={todo.id} 
            className="todo-item done"
            onClick={()=>navigate(`/items/${todo.id}`)}
            > <img
              onClick={(e)=>{e.stopPropagation();toggleTodo(todo.id)}} 
              src="src\assets\icon\Property 1=Frame 2610233@3x.png" alt="" />{todo.name}</li>
          ))}
        </ul>
        ):(
         <div className="empty-state">
          <img src="src\assets\images\Type=Done, Size=Large@3x.png" alt="아직 다 한 일이 없어요. 해야 할 일을 체크해 보세요!" />
          <p>아직 다 한 일이 없어요. </p>
          <p>해야 할 일을 체크해 보세요!</p>
         </div>
         )}
      </div>
    </div>
  );
}

export default TodoList