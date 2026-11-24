import { useNavigate, useParams } from "react-router-dom"
import './TodoDetailPage.css'
import { useRef, useState, type ChangeEvent,  useEffect} from "react"
import TodoDetailItem from "../components/todo/TodoDetailItem"
import defaultImg from "../assets/images/img.png"
import checkIcon from "../assets/icon/check.png"
import xIcon from "../assets/icon/X.png"
import { deleteTodo, getTodo, updateTodo, uploadImage } from "../api/todos"
import type { Todo } from "../types/TodoType"

// 상세 페이지 - 조회, 수정, 삭제
function TodoDetailPage() {
  
  const { itemId } = useParams()
  const navigate = useNavigate()

  const id = Number(itemId)  // 주소의 id는 문자열이라 숫자로 변환
  const [todo, setTodo] = useState<Todo | null>(null)  // 도착 전에는 null
  const [loadError, setLoadError] = useState(false)
  const [name, setName] = useState('')
  const [memo, setMemo] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  // 상세 조회 - 응답 시 초기값
  useEffect(() => {
    getTodo(id)
      .then((data) => {
        setTodo(data)
        setName(data.name)
        setMemo(data.memo ?? '')  
        setImageUrl(data.imageUrl ?? '')
      })
      .catch(() => setLoadError(true))
  }, [id])  // id가 바뀌면 다시 조회

  // 완료 토글 - 상태 바로 저장 및 반영
  const toggleTodo = async () => {
    if (!todo) return
    try {
      await updateTodo(id, { isCompleted: !todo.isCompleted })
      setTodo({ ...todo, isCompleted: !todo.isCompleted })
    } catch {
      alert('상태를 바꾸지 못했어요.')
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null)



  // 이미지 선택 및 업로드 - 조건: 이미지 파일, 영어 파일명, 5MB 이하
  // 수정완료 버튼 클릭 시 저장
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0]
    // 같은 파일 재선택 가능. 초기화
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
    setIsUploading(true)
    try {
      const url = await uploadImage(file)
      setImageUrl(url)
    } catch {
      alert('이미지를 업로드하지 못했어요.')
    }finally {
      setIsUploading(false)
    }
  }

    // 이미지 수정 및 저장 - 이름, 메모, 이미지저장
    // 성공 시 목록 이동
  const handleSave = async () => {
    const trimmedName = name.trim()
    if (!trimmedName) {
      alert('할 일 이름을 입력해주세요.')
      return
    }

    try {
      await updateTodo(id, { name: trimmedName, memo, ...imageUrl && { imageUrl } }) // img 주소가 있을 때만 포함
      navigate('/')
    } catch {
      alert('저장하지 못했어요.')
    }
  }

  // 삭제 - 확인 후 삭제
  // 성공 시 목록으로 이동
  const handleDelete= async() => {
    if (!window.confirm('정말 삭제할까요?')) return;
    try {
      await deleteTodo(id)
      navigate('/')
    }catch{
      alert('삭제하지 못했어요.')
    }
  }

  if (loadError) return <p>할 일을 찾을 수 없어요.</p>
  if (!todo) return <p>불러오는 중...</p>

  return (
  <div className="detail-container">
    <TodoDetailItem
      isCompleted={todo.isCompleted}
      name={name}
      onNameChange={setName}
      onToggle={toggleTodo}
    /> 
    <div className="detail-content">
      <div className="detail-img">
        {imageUrl ? (
          <img className="attached-img" src={imageUrl} alt="첨부 이미지" />
        ):(
          <img className="default-img" src={defaultImg} alt="기본 이미지" />)}
        <button className={imageUrl? "img-add-btn is-edit":"img-add-btn" }
          onClick={()=>fileInputRef.current?.click()}
          disabled={isUploading}
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
            disabled={isUploading}
          ><img src={checkIcon} alt="" />수정완료</button>
          <button 
            className="delete-btn"
            onClick={handleDelete}
          ><img src={xIcon} alt="" />삭제하기</button>
        </div>
      </div>
    </div>     
 </div>
  )
}

export default TodoDetailPage
