import React from "react"
import TodoForm from "./TodoForm"

export default function TodoCreate(props) {
    return (
        <article className='createToDo m-2 text-white justify-content-center'>
            <TodoForm setShowCreate={props.setShowCreate} getToDos={props.getToDos} />
        </article>
    )
}
