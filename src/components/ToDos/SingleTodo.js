import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import ToDoEdit from './ToDoEdit'
import axios from 'axios'

export default function SingleTodo(props) {
    const { name, description, url, linkText, todoId } = props.todo 

    // The hook below controls whether the Edit form is shown/hidden
    const [showEdit, setShowEdit] = useState(false)
    // Bring in current user for admin check
    const { currentUser } = useAuth()

    // Below is our custom delete function
    const deleteToDo = (id)=> {
      if(window.confirm(`Are you sure you want to delete${name}?`)){
        axios.delete(`http://todoapi.aliciavillegas.net/api/ToDos/${id}`).then(() => {
          props.getToDos()
        })
      }
    }

  return (
    <div className='singleToDo col-md-5 m-4'>
      {/* EDIT/DELETE UI - only show to admin */}
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div>
          <button onClick={() => setShowEdit(true)} id="editLink">
            <FaEdit />
          </button>
          <button onClick={() => deleteToDo(todoId)} id="deleteLink">
            <FaTrashAlt />
          </button>
          {showEdit &&
            <ToDoEdit 
              todo={props.todo}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getToDos={props.getToDos} />
          }
        </div>
      }
        <h3>{name}</h3>
        { description !== null ?
        <p>{description}</p> : 
        <p>No description provided.</p>    
        }
        <a href={url} target='_blank' rel='noreferrer' className="btn btn-dark">
            Visit { linkText }
        </a>
    </div>
  )
}
