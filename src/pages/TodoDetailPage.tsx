import { useParams } from "react-router-dom"

function TodoDetailPage({todos}) {
  
  const { itemId } = useParams()
  const todo = todos.find((todo) => todo.id === Number(itemId))

  return (
  <div className="detail-container">
    <div className="detail-todo"> 
      <img src="/src/assets/icon/Property 1=Default@3x.png" alt="" /> 
      <div>{todo.name}</div>
    </div>    
   <p>선택한 ID: {itemId}</p>
 </div>
  )
}

export default TodoDetailPage
