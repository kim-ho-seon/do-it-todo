import { useParams } from "react-router-dom"
import './TodoDetailPage.css'

function TodoDetailPage({todos}) {
  
  const { itemId } = useParams()
  const todo = todos.find((todo) => todo.id === Number(itemId))

  return (
  <div className="detail-container">
    <div className="detail-todo"> 
      <img src="/src/assets/icon/Property 1=Default@3x.png" alt="" /> 
      <div>{todo.name}</div>
    </div>    
    <div className="detail-content">
      <div className="detail-img">
        <img src="/src/assets/images/img@3x.png" alt="" />
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
