import './TodoList.css'
import type { Dispatch, SetStateAction } from 'react';
import { updateTodo } from '../../api/todos';
import type { Todo } from '../../types/TodoType';
import TodoSection from './TodoSection';
import { useRouter } from 'next/navigation';

// todo 목록
function TodoList({todos,setTodos}:{
  todos:Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
}){

  const router = useRouter()

  const todoItems = todos.filter((todo) => !todo.isCompleted);
  const doneItems = todos.filter((todo) => todo.isCompleted);
  
  const goToDetail = (id: number) => router.push(`/items/${id}`)

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
      <TodoSection variant="todo" todos={todoItems} onToggle={toggleTodo} onItemClick={goToDetail}/>
      <TodoSection variant="done" todos={doneItems} onToggle={toggleTodo} onItemClick={goToDetail}/>
    </div>
  );
}

export default TodoList