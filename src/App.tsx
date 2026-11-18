
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TodoListPage from './pages/TodoListPage'
import TodoDetailPage from './pages/TodoDetailPage';
import Header from './components/common/Header';
import { useState } from 'react';

function App() {
const [todos, setTodos] = useState([
  { id: 1, name: '청소하기', isCompleted: false },
  { id: 2, name: '빨래하기', isCompleted: false },
  { id: 3, name: '장보기', isCompleted: false },
  { id: 4, name: '먼지털기', isCompleted: false },
  { id: 5, name: '정리하기', isCompleted: true },
  { id: 6, name: '치우기', isCompleted: true },
  { id: 7, name: '쓸고닦기', isCompleted: true },
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
