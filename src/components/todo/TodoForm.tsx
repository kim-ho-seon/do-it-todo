import './TodoForm.css';

function TodoForm
() {
  return (
    <form className="todo-form">
      <input type="text" placeholder="할 일을 입력해주세요." />
      <button type="submit"><span className="plus-icon" aria-hidden="true"></span>추가하기</button>
    </form>
    
  );
}

export default TodoForm;