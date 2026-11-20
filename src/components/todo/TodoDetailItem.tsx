import './TodoDetailItem.css'
import checkOffIcon from '../../assets/icon/checkEmpty.png'
import checkOnIcon from '../../assets/icon/checkCircle.png'

type TodoDetailItemProps = {
  isCompleted: boolean
  name: string
  onNameChange: (name: string) => void
  onToggle: () => void
}

// 상세 페이지 상단의 할 일 이름 영역 (Figma: check-list-detail)
// - 체크 버튼: 진행 중 ↔ 완료 전환
// - 이름: 입력창에서 바로 수정
function TodoDetailItem({isCompleted, name, onNameChange, onToggle}:TodoDetailItemProps){
  return(
    <div className={isCompleted ? "detail-todo done" : "detail-todo"}>
      <button
        type="button"
        className="check-btn"
        onClick={onToggle}
        aria-label={isCompleted ? '진행 중으로 변경' : '완료로 변경'}
      >
        <img src={isCompleted ? checkOnIcon : checkOffIcon} alt=""/>
      </button> 
      <input
        className="detail-name-input"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder="할 일 이름"
        aria-label="할 일 이름"
      />
    </div>
  )
}

export default TodoDetailItem