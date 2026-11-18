import { useParams } from "react-router-dom"
import './TodoDetailPage.css'
import type { Todo } from "../App"

function TodoDetailPage({todos}:{todos:Todo[]}) {
  
  const { itemId } = useParams()
  const todo = todos.find((todo) => todo.id === Number(itemId))

  if (!todo) {
    return <p>할 일을 찾을 수 없어요.</p>
  }

  return (
  <div className="detail-container">
    <div className={todo.isCompleted ? "detail-todo done" : "detail-todo"}>
      {todo.isCompleted ? (
        <img src="/src/assets/icon/Property 1=Frame 2610233@3x.png" alt="" />
      ) : (
        <img src="/src/assets/icon/Property 1=Default@3x.png" alt="" />
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
        <img className="memo-img" src="/src/assets/images/memo@3x.png" alt="" />
        <div className="memo-btns">
          <button className="edit-btn"><img src="/src/assets/icon/check.png" alt="" />수정완료</button>
          <button className="delete-btn"><img src="/src/assets/icon/X.png" alt="" />삭제하기</button>
        </div>
      </div>
    </div>     
   <p>선택한 ID: {itemId}</p>
 </div>
  )
}

export default TodoDetailPage
