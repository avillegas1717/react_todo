import React from 'react'

export default function singleToDo(props) {
  const { name, description, url, linkText } = props.todo
  return (
    <div className='singleTodo col-md-5 m-4'>
      <h3>{name}</h3>
      {description !== null ?
        <p>{description}</p> : <p>No description provided.</p>
      }
      <a href={url} target='_blank' rel='noreferrer' className="btn btn-info">
        Visit {linkText}
      </a>
    </div>
  )
}