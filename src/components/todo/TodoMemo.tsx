import './TodoMemo.css'

type TodoMemoProps = {
  memo: string
  setMemo: (memo: string) => void
}

// 상세 페이지 메모 입력 영역
function TodoMemo({ memo, setMemo }: TodoMemoProps) {
  return (
    <div className="memo-box">
      <h3 className="memo-title">Memo</h3>
      <textarea
        className="memo-textarea"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모를 입력하세요"
      />
    </div>
  )
}

export default TodoMemo
