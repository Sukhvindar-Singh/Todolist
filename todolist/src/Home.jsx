import React, { useState, useEffect } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs'
function Home() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/'+id)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

  return (
    <div className="home-container">
        <h1>Todo List</h1>
        <Create />
        {
            todos.length === 0 
            ?
            <div><h2>No Record</h2></div>
            :
            todos.map(todo => (
                <div className='task'>
                    <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                        {todo.done ?
                        <BsFillCheckCircleFill ClassName='icon'></BsFillCheckCircleFill>
                        :<BsCircleFill className='icon' />
                        }
                        <p>{todo?.task}</p>
                    </div>
                    <div>
                        <span><BsFillTrashFill className='icon'/></span>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Home