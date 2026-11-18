
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TodoListPage from './pages/TodoListPage'
import TodoDetailPage from './pages/TodoDetailPage';

function App() {

  return (
    <div className="main-container">

      <Routes>
            <Route path='/' element={<TodoListPage />} />
            <Route path='/items/:itemId' element={<TodoDetailPage />}/>
      </Routes>

    </div>
  )
}

export default App
