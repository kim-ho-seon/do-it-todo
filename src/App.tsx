
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TodoListPage from './pages/TodoListPage'
import TodoDetailPage from './pages/TodoDetailPage';
import Header from './components/common/Header';
import { useState } from 'react';

export type Todo = {
  id: number;
  tenantId?: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

function App() {
const [todos, setTodos] = useState([
{
    id: 1,
    name: '청소하기',
    isCompleted: false,
    imageUrl: '',
    memo: '',
  },
  {
    id: 2,
    name: '빨래하기',
    isCompleted: true,
    imageUrl: '',
    memo: '빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.빨래를 완료했습니다.',
  },
  {
    id: 3,
    name: '장보기',
    isCompleted: false,
    imageUrl: '',
    memo: '',
  },
  {
    id: 4,
    name: '운동하기',
    isCompleted: true,
    imageUrl: '이미지주소',
    memo: '오늘은 30분 동안 러닝을 했습니다.',
  },
  {
    id: 5,
    name: '책 읽기',
    isCompleted: false,
    imageUrl: '',
    memo: '',
  },
  {
    id: 6,
    name: '방 정리하기',
    isCompleted: true,
    imageUrl: '이미지주소',
    memo: '방 정리를 깔끔하게 마쳤습니다.',
  },
  {
    id: 7,
    name: '코딩 공부하기',
    isCompleted: false,
    imageUrl: '',
    memo: '',
  },
]);

  return (
  <>
  <Header/> 
    <div className="main-container">
      
      <Routes>
            <Route path='/' element={<TodoListPage todos={todos}/>} />
            <Route path='/items/:itemId' element={<TodoDetailPage todos={todos}/>}/>
      </Routes>    
  
    </div>
    </>
  )
}

export default App
