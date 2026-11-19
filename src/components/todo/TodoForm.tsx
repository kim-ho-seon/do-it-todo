import { useState, type Dispatch, type SetStateAction } from 'react';
import './TodoForm.css';
import type { Todo } from '../../App';

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
      <input 
        type="text" 
        placeholder="할 일을 입력해주세요."
        value={inputValue}
        onChange={(e)=> setInputValue(e.target.value)}
      />
      <button type="submit"><span className="plus-icon" aria-hidden="true"></span>추가하기</button>
    </form>
    
  );
}

export default TodoForm;