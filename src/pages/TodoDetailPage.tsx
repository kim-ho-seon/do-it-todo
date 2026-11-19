import { useNavigate, useParams } from "react-router-dom"
import './TodoDetailPage.css'
import type { Todo } from "../App"
import { useRef, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react"

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

  const [name, setName] = useState(todo?.name ?? '')
  const [memo, setMemo] = useState(todo?.memo ?? '')
  const [imageUrl, setImageUrl] = useState(todo?.imageUrl ?? '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 이미지파일 선택
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0]
    e.target.value = ''
    if(!file) return
    if(!file.type.startsWith('image/')){
      alert('이미지 파일만 첨부할 수 있어요.');
      return
    }
    const baseName = file.name.replace(/\.[^.]+$/, '')
    if (!/^[a-zA-Z]+$/.test(baseName)) {
      alert('파일 이름은 영어로만 되어 있어야 해요.')
      return
    }
    
    if(file.size > 5*1024*1024){
      alert('5MB 이하 이미지만 첨부할 수 있어요.')
      return
    }
    setImageUrl(URL.createObjectURL(file))
  }

    // 수정 및 저장
  const handleSave =()=>{
    const trimmedName = name.trim()
    if (!trimmedName) {
      alert('할 일 이름을 입력해주세요.')
      return
    }

    setTodos((prev)=>
      prev.map((item)=>
        item.id === Number(itemId) ? { ...item, memo, imageUrl, name } : item
      )
    );
    navigate('/')
  }

  // 삭제
  const handleDelete=()=>{
    if (!window.confirm('정말 삭제할까요?')) return;
    setTodos((prev)=>prev.filter((item)=>item.id !== Number(itemId)))
    navigate('/');
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
      <input
        className="detail-name-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="할 일 이름"
        aria-label="할 일 이름"
      />
    </div>    
    <div className="detail-content">
      <div className="detail-img">
        {imageUrl ? (
          <img className="attached-img" src={imageUrl} alt="첨부 이미지" />
        ):(
          <img className="default-img" src="/src/assets/images/img@3x.png" alt="기본 이미지" />)}
        <button className={imageUrl? "img-add-btn is-edit":"img-add-btn" }
          onClick={()=>fileInputRef.current?.click()}
          type="button" 
          aria-label={imageUrl?"이미지 변경":"이미지 추가"}> 
        </button>
        <input type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          hidden
        />
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
            className={todo.isCompleted ?"is-done edit-btn":"edit-btn"}
            onClick={handleSave}
          ><img src="/src/assets/icon/check.png" alt="" />수정완료</button>
          <button 
            className="delete-btn"
            onClick={handleDelete}
          ><img src="/src/assets/icon/X.png" alt="" />삭제하기</button>
        </div>
      </div>
    </div>     
 </div>
  )
}

export default TodoDetailPage
