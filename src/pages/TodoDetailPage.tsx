import { useNavigate, useParams } from "react-router-dom"
import './TodoDetailPage.css'
import type { Todo } from "../App"
import { useState, type Dispatch, type SetStateAction } from "react"

function TodoDetailPage({todos,setTodos}:{
  todos:Todo[],
  setTodos: Dispatch<SetStateAction<Todo[]>>
}) {
  
  const { itemId } = useParams()
  const navigate = useNavigate()

  // 완료토글
  const todo = todos.find((todo) => todo.id === Number(itemId))
  const toggleTodo = (id: number) => {
    setTodos((prev)=>
      prev.map((todo)=> 
        todo.id === id? {...todo, isCompleted: !todo.isCompleted} : todo))}


  // 메모수정 
  const [memo, setMemo] = useState(todo?.memo ?? '')

  const handleSaveMemo =()=>{
    setTodos((prev)=>
      prev.map((item)=>
        item.id === Number(itemId) ? { ...item, memo } : item
      )
    );
    navigate('/')
  }

  if (!todo) {
    return <p>할 일을 찾을 수 없어요.</p>
  }

  return (
  <div className="detail-container">
    <div className={todo.isCompleted ? "detail-todo done" : "detail-todo"}>
      {todo.isCompleted ? (
        <img
        onClick={()=>{toggleTodo(todo.id)}} 
        src="/src/assets/icon/Property 1=Frame 2610233@3x.png" alt="" />
      ) : (
        <img 
        onClick={()=>{toggleTodo(todo.id)}}
        src="/src/assets/icon/Property 1=Default@3x.png" alt="" />
      )}
      <div>{todo.name}</div>
    </div>    
    <div className="detail-content">
      <div className="detail-img">
        {todo.imageUrl ? (
          <img className="attached-img" src={todo.imageUrl} alt="첨부 이미지" />
        ):(
          <img className="default-img" src="/src/assets/images/img@3x.png" alt="기본 이미지" />)}
        <button type="button" className="img-add-btn" aria-label="이미지 추가"></button>
      </div>
      <div className="detail-memo">
        <div className="memo-box">
          <h3 className="memo-title">Memo</h3>
          <textarea
                className="memo-textarea"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="메모를 입력하세요"
              />
        </div>
        <div className="memo-btns">
          <button 
            className="edit-btn"
            onClick={handleSaveMemo}
          ><img src="/src/assets/icon/check.png" alt="" />수정완료</button>
          <button className="delete-btn"><img src="/src/assets/icon/X.png" alt="" />삭제하기</button>
        </div>
      </div>
    </div>     
   <p>선택한 ID: {itemId}</p>
 </div>
  )
}

export default TodoDetailPage
