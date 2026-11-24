import { useRef, type ChangeEvent } from 'react'
import './TodoImageUploader.css'
import defaultImg from '../../assets/images/img.png'
import { uploadImage } from '../../api/todos'
import { validateImage } from '../../utils/validateImage'

type TodoImageUploaderProps = {
  imageUrl: string
  setImageUrl: (url: string) => void
  isUploading: boolean
  setIsUploading: (isUploading: boolean) => void
}

// 상세 페이지 이미지 영역
// - 이미지 선택 → 검사 → 업로드 후 주소를 부모에게 전달
// - 실제 저장은 부모의 수정완료 버튼에서
function TodoImageUploader({ imageUrl, setImageUrl, isUploading, setIsUploading }: TodoImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  
    // 이미지 선택 및 업로드 - 검사 후 업로드, 저장은 수정완료 버튼에서
    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>)=>{
      
    const file = e.target.files?.[0]
    // 같은 파일 재선택 가능. 초기화
    e.target.value = ''
    if(!file) return
      
    const error = validateImage(file)
      
    if (error) {
    alert(error)
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
  return(
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
  )
 }

export default TodoImageUploader