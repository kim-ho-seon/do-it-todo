"use client"

import { useEffect, useState } from "react"
import TodoForm from "@/components/todo/TodoForm"
import TodoList from "@/components/todo/TodoList"
import { getTodos } from "@/api/todos"
import type { Todo } from "@/types/TodoType"

function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([])

  // 처음 목록 조회
  useEffect(()=>{
    getTodos()
    .then((data)=>setTodos(data))
    .catch(()=>alert("목록을 불러오지 못했어요"))
  },[])

  return (
    <>
    <TodoForm setTodos={setTodos} />
    <TodoList todos={todos} setTodos={setTodos}/>
    </>
 
  )
}

export default TodoListPage
