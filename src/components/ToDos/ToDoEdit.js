import React from 'react'
import Modal from 'react-bootstrap/Modal'
import TodoForm from './TodoForm'

export default function ToDoEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
        size='lg'>
            <Modal.Header className='bg-info' closeButton>
                <h3>Editing {props.todo.name}</h3>
            </Modal.Header>
            <Modal.Body>
                <TodoForm
                    setShowEdit={props.setShowEdit}
                    getToDos={props.getToDos}
                    todo={props.todo} />
            </Modal.Body>
    </Modal>
  )
}


