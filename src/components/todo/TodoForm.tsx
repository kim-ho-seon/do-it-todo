import { useState, type Dispatch, type SetStateAction } from 'react';
import './TodoForm.css';
import type { Todo } from '../../App';
import SearchInput from '../common/SearchInput';

function TodoForm({setTodos}:{setTodos:Dispatch<SetStateAction<Todo[]>>}) {

  const [inputValue, setInputValue]= useState('');

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>)=>
    {e.preventDefault()
    const name = inputValue.trim();
    if (!name) return;
    setTodos((prev)=>[...prev,{id: Date.now(), name, isCompleted: false}]);
    setInputValue('')
  }

  return (
    <form className="todo-form"
      onSubmit={handleSubmit}>
      <SearchInput value={inputValue} onChange={setInputValue} />
      <button type="submit" aria-label="추가하기">
        <span className="plus-icon" aria-hidden="true"></span>
        <span className="btn-text">추가하기</span>
      </button>
    </form>
    
  );
}

export default TodoForm;