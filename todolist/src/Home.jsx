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
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="home-container">
            <h1>Todo List</h1>
            <div className="counter-panel">
                <p>Pending: {todos.filter(t => !t.done).length}</p>
                <p>Completed: {todos.filter(t => t.done).length}</p>
            </div>

            <Create />
            {
                todos.length === 0 
                ?
                <div className="no-record"><h2>No Record Found</h2></div>
                :
                todos.map(todo => (
                    <div className='task' key={todo._id}>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                                <BsFillCheckCircleFill className='icon' />
                                : <BsCircleFill className='icon' />
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span>
                                <BsFillTrashFill 
                                    className='icon trash-icon'
                                    onClick={() => handleDelete(todo._id)}
                                />
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Home