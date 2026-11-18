import { useParams } from "react-router-dom"

function TodoDetailPage() {

  const { itemId } = useParams()

  return (
  <div className="detail-container">
   <p>선택한 ID: {itemId}</p>
 </div>
  )
}

export default TodoDetailPage
