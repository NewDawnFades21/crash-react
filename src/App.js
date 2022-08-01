import React, { useEffect, useRef, useState } from 'react'
import TodoList from "./TodoList";
import { v4 as uuidv4} from 'uuid'

function App() {
  // inital state
  const [todos,setTodos] = useState([])
  const LOCAL_STORAGE_KEY = "todoApp.todos"

  // once the component loads
  useEffect(()=>{
    console.log(" once the component loads")
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    console.log(storedTodos)
    if(storedTodos){
      setTodos(storedTodos)
    }
  },[])

  // when todos change,executed
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  },[todos])

  const inputRef = useRef()

  function handleAddTodo(e){
    const name = inputRef.current.value;
    if(!name){
      return;
    }
    // ATTENTION: setTodos takes prev todos as input and return new todos as output
    setTodos((prevTodos) => {
      return [...prevTodos,{
        id:uuidv4(),
        name:name,
        completed:false
      }]
    })
    inputRef.current.value = ''
  }

  function toggleTodo(id){
    const newTodos = [...todos];
    const newTodo = newTodos.find((todo) => todo.id === id)
    newTodo.completed = !newTodo.completed
    setTodos(newTodos)
  }

  function handleClearCompleteTodo(){
    const newTodos = [...todos];
    setTodos(newTodos.filter((todo) => !todo.completed))
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleClearCompleteTodo}>Clear Completed todos</button>
        <div>0 left todo</div>
      </div>
    </>
  )
}

export default App;
