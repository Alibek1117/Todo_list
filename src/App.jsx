import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
const BASE_URL = "http://localhost:5050/todos"
 
const [todos, setTodos] = useState([])
let [newTodos, setNewTodos] = useState('')


useEffect(() =>{
  axios .get(BASE_URL).then(res =>res).then(data=> setTodos(data.data))
},[])

const handleSubmit =(e)=>{
  e.preventDefault()
  if(!newTodos) return;
  axios.post(BASE_URL, {
    title: newTodos,
    completed: false,
  }).then(res=> setTodos([...todos, res.data]))

 
}
const handleDelete =(id)=>{
  axios.delete(`${BASE_URL}/${id}`).then(res=>setTodos(todos.filter(item=> item.id !== id)))
}
// console.log(e);
  return (
    <>
      <div className="container mx-auto max-w-screen-md bg-slate-100 p-4 shadow">
        <h1>Todo list {todos.length}</h1>
        <form
          className="flex items-center justify-between gap-4 "
          onSubmit={handleSubmit}
        >
          <input
            className="w-full p-4 text-xl"
            type="text"
            placeholder=" Add new to do"
            onChange={(e) => setNewTodos(e.target.value)}
          />
          <button className="w-32 bg-blue-400 p-4 text-xl rounded-xl" type="submit">
            Add
          </button>
        </form>

        {todos?.map((todo, index) => (
          <div className="mt-4 flex items-center justify-between" key={todo.id}>
            <div className="flex w-full ">
              <input
                className="w-6"
                type="checkbox"
                id={`checkbox-${todo.id}`}
              />
              <label
                className="ml-4 block w-full border-2 text-xl "
                htmlFor={`checkbox-${todo.id}`}
              >
                {todo.title}
              </label>
            </div>
            <button className="w-32 bg-red-400 p-3 text-xl rounded-xl" onClick={()=>{handleDelete(todo.id)}}>Delete</button>
          </div>
        ))}
      </div>

    </>
  );
}

export default App
