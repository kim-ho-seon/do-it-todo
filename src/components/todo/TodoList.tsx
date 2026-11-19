
import { useNavigate, } from 'react-router-dom';
import './TodoList.css'
import type { Todo } from '../../App';
import type { Dispatch, SetStateAction } from 'react';
import todoTitleImg from '../../assets/images/todo.png';
import doneTitleImg from '../../assets/images/done.png';
import checkOffIcon from '../../assets/icon/checkEmpty.png';
import checkOnIcon from '../../assets/icon/checkCircle.png';

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
          <img src={todoTitleImg} alt="TO DO" />     
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
              src={checkOffIcon} alt="" />{todo.name}
            </li>
          ))}
        </ul> 
        ):(
         <div className="empty-state">
          <div className="empty-img empty-img-todo" aria-hidden="true"></div>          
          <p>할 일이 없어요.</p>
          <p>TODO를 새롭게 추가해주세요!</p>
         </div>
         )}
         
      </div>

      <div className="done-section">
        <h2>
          <img src={doneTitleImg} alt="DONE" />
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
              src={checkOnIcon} alt="" />{todo.name}</li>
          ))}
        </ul>
        ):(
         <div className="empty-state">
          <div className="empty-img empty-img-done" aria-hidden="true"></div>
          <p>아직 다 한 일이 없어요. </p>
          <p>해야 할 일을 체크해 보세요!</p>
         </div>
         )} 
      </div>
    </div>
  );
}

export default TodoList