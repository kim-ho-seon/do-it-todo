"use client"

import { useParams, useRouter } from "next/navigation"
import './TodoDetailPage.css'
import { useState, useEffect} from "react"
import TodoDetailItem from "@/components/todo/TodoDetailItem"
import checkIcon from "@/assets/icon/check.png"
import xIcon from "@/assets/icon/X.png"
import { deleteTodo, getTodo, updateTodo } from "@/api/todos"
import type { Todo } from "@/types/TodoType"
import TodoImageUploader from "@/components/todo/TodoImageUploader"
import TodoMemo from "@/components/todo/TodoMemo"

// 상세 페이지 - 조회, 수정, 삭제
function TodoDetailPage() {
  
  const { itemId } = useParams<{ itemId: string }>()
  const router = useRouter()
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
      router.push('/')
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
      router.push('/')
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
      <TodoImageUploader imageUrl={imageUrl} setImageUrl={setImageUrl} isUploading={isUploading} setIsUploading={setIsUploading}/>
      <div className="detail-memo">
        <TodoMemo memo={memo} setMemo={setMemo} />
        <div className="memo-btns">
          <button 
            className={todo.isCompleted ?"is-done edit-btn":"edit-btn"}
            onClick={handleSave}
            disabled={isUploading}
          ><img src={checkIcon.src} alt="" />수정완료</button>
          <button 
            className="delete-btn"
            onClick={handleDelete}
          ><img src={xIcon.src} alt="" />삭제하기</button>
        </div>
      </div>
    </div>     
 </div>
  )
}

export default TodoDetailPage
