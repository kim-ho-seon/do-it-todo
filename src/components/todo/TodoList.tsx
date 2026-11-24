
import { useNavigate, } from 'react-router-dom';
import './TodoList.css'
import type { Dispatch, SetStateAction } from 'react';
import TodoListItem from './TodoListItem';
import todoTitleImg from '../../assets/images/todo.png';
import doneTitleImg from '../../assets/images/done.png';
import { updateTodo } from '../../api/todos';
import type { Todo } from '../../types/TodoType';

// todo 목록
function TodoList({todos,setTodos}:{
  todos:Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
}){

  const navigate = useNavigate()

  const todoItems = todos.filter((todo) => !todo.isCompleted);
  const doneItems = todos.filter((todo) => todo.isCompleted);
  
  // 완료 토글 - 서버 저장 후 화면 반영
  const toggleTodo = async (id: number) => {
    const target = todos.find((todo)=> todo.id === id) // 누른 항목 찾기
    if(!target) return;

    const isCompleted = !target.isCompleted; // 값 반전

    try {
      await updateTodo(id, { isCompleted }); // 서버 저장
      setTodos((prev) => // 값 반영
        prev.map((todo) => (todo.id === id ? { ...todo, isCompleted } : todo))
      );
    }catch{
      alert('상태를 바꾸지 못했어요.')
    }
  }
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
            <TodoListItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onClick={(id) => navigate(`/items/${id}`)}
            />
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
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onClick={(id) => navigate(`/items/${id}`)}
            />
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