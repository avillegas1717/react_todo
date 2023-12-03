import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterCat from './FilterCat'
import { Container } from 'react-bootstrap'
import SingleTodo from './SingleTodo'
import { useAuth } from '../../contexts/AuthContext'
import ToDoCreate from './TodoCreate'

export default function Todos() {
  const [todos, setToDos] = useState([])
  const {currentUser} = useAuth()
  const [filter, setFilter] = useState(0);
  const [showCreate, setShowCreate] = useState(false);

  const getTodos = () => {
    axios.get(`http://todoapi.aliciavillegas.net/api/ToDos`).then(response => {
      setToDos(response.data)
    })
  }

  useEffect(() => {
    getTodos()
  }, [])
  return (
    <section className="todos">
        <article className="bg-dark p-5">
            <h1 className="text-center text-light">Tasks Home</h1>
        </article>
        {/* Begin Create UI - only show to admin */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <div className="bg-dark p-2 mb-3 text-center">
                <button className="btn btn-dark" onClick={() => setShowCreate(!showCreate)}>
                    {!showCreate ? 'Create New Task' : 'Cancel'}
                </button>
                <div className="createContainer">
                    {showCreate &&
                    
                        <ToDoCreate getTodos={getTodos} setShowCreate={setShowCreate}/>
                    }
                </div>
            </div>
        }
        <FilterCat setFilter={setFilter}/>
        <Container>
            <article className="resourceGallery row justify-content-center">
                {/* Below we write conditional rendering to see if the user is trying to filter results or not, and display the right resources according to what they want. */}
                {filter === 0 ? todos.map(t => 
                    <SingleTodo key={t.resourceId} todo={t}/>
                ) :
                todos.filter(t => t.categoryId === filter).map(t =>
                   <SingleTodo key={t.resourceId} todo={t}/>
                )
                }
                {filter !== 0 && todos.filter(t => t.categoryId === filter).length === 0 &&
                <h2 className="alert alert-warning text-dark">
                    There are no results for this category.
                </h2>
                }
            </article>
            
        </Container>
    </section>

   
  )
}
