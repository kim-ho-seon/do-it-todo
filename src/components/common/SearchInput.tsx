import './SearchInput.css'

type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

// 할 일 입력창 (Figma: search)
// - 입력한 글자를 부모에게 문자열로 전달
// - 글이 길면 오른쪽으로 계속 이어짐 (input 기본 동작)
function SearchInput({value, onChange, placeholder='할 일을 입력해주세요'}:SearchInputProps ){
  return(
    <input 
      type="text"
      className="search-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="할 일 입력"
    />
  )
}


export default SearchInput