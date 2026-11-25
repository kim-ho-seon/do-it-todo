import { useState, type Dispatch, type SetStateAction } from 'react';
import './TodoForm.css';
import SearchInput from '../common/SearchInput';
import { createTodo } from '../../api/todos';
import type { Todo } from '../../types/TodoType';

// 할일 추가 form
function TodoForm({setTodos}:{setTodos:Dispatch<SetStateAction<Todo[]>>}) {

  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false)
  
  //할일 추가 - 요청중 중복 추가 방지
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>)=>
    {e.preventDefault()
    const name = inputValue.trim();
    if (!name || isAdding) return;
    setIsAdding(true);
    try {
      const newTodo = await createTodo(name);
      setTodos((prev)=>[...prev, newTodo]);
      setInputValue('')
    }catch{
      alert('할 일을 추가하지 못했어요')
    } finally {
      setIsAdding(false);
    }
  }
  return (
    <form className="todo-form"
      onSubmit={handleSubmit}>
      <SearchInput value={inputValue} onChange={setInputValue} />
      <button type="submit" 
        disabled={isAdding}
        aria-label="추가하기">
        <span className="plus-icon" aria-hidden="true"></span>
        <span className="btn-text">추가하기</span>
      </button>
    </form>
  )   
}

export default TodoForm