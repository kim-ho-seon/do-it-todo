import type { Todo } from '../../types/TodoType';
import todoTitleImg from '../../assets/images/todo.png'
import doneTitleImg from '../../assets/images/done.png'
import TodoListItem from './TodoListItem';
import './TodoSection.css';

const SECTION_CONFIG = {
  todo: {
    titleImg: todoTitleImg,
    titleAlt: 'TO DO',
    emptyMessages: ['할 일이 없어요.', 'TODO를 새롭게 추가해주세요!'],
  },
  done: {
    titleImg: doneTitleImg,
    titleAlt: 'DONE',
    emptyMessages: ['아직 다 한 일이 없어요.', '해야 할 일을 체크해 보세요!'],
  },
}

type TodoSectionProps = {
  variant: 'todo' | 'done'
  todos: Todo[]
  onToggle: (id: number) => void
  onItemClick: (id: number) => void
}

// 할 일 / 완료 섹션 - 제목, 목록, 비었을 때 안내
function TodoSection({ variant, todos, onToggle, onItemClick }: TodoSectionProps) {
  const { titleImg, titleAlt, emptyMessages } = SECTION_CONFIG[variant]

  return (
    <div className={`${variant}-section`}>
      <h2>
        <img src={titleImg.src} alt={titleAlt} />
      </h2>

      {todos.length > 0 ? (
        <ul className="check-list">
          {todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onClick={onItemClick}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <div className={`empty-img empty-img-${variant}`} aria-hidden="true"></div>
          {emptyMessages.map((msg) => (
            <p key={msg}>{msg}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default TodoSection