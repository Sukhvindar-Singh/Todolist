import React, { useState } from 'react'
import axios from 'axios'

function Create() {
  const [task, setTask] = useState("")

  const handleAdd = () => {
    if (!task.trim()) return;
    
    axios.post('http://localhost:3001/add', { task })
    .then(result => {
      window.location.reload()
    })
    .catch(err => console.log(err))
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div className="create_form">
        <input 
          type="text" 
          placeholder="Enter Task" 
          onChange={(e) => setTask(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create