import './TodoListItem.css'
import type { Todo } from "../../App"
import checkOffIcon from '../../assets/icon/checkEmpty.png'
import checkOnIcon from '../../assets/icon/checkCircle.png'

type TodoListItemProps = {
  todo: Todo
  onToggle: (id: number) => void   // 체크 버튼 눌렀을 때
  onClick: (id: number) => void    // 항목 눌렀을 때
}

// 할 일 목록의 한 줄 (Figma: check-list)
// - 체크 버튼: 진행 중 ↔ 완료 전환
// - 나머지 영역: 상세 페이지로 이동
function TodoListItem({todo, onToggle, onClick}:TodoListItemProps){
  return(
      <li
      className={todo.isCompleted ? 'todo-list-item done' : 'todo-list-item'}
      onClick={() => onClick(todo.id)}
    >
      <button
        type="button"
        className="check-btn"
        onClick={(e) => {
          e.stopPropagation()
          onToggle(todo.id)
        }}
        aria-label={todo.isCompleted ? '진행 중으로 변경' : '완료로 변경'}
      >
        <img src={todo.isCompleted ? checkOnIcon : checkOffIcon} alt="" />
      </button>
      {todo.name}
    </li>
  )
}

export default TodoListItem
