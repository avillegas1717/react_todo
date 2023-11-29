import React from 'react'
import Modal from 'react-bootstrap/Modal'
import CatForm from './CatForm'

export default function CatEdit(props) {
  return (
    <Modal
    show={props.showEdit}
    onHide={() => props.setShowEdit(false)}
    size='lg'>
        <Modal.Header closeButton>
            <h2>Editing {props.category.categoryName}</h2>
        </Modal.Header>
        <Modal.Body>
            <CatForm
            getCategories={props.getCategories} 
            setShowEdit={props.setShowEdit}
            category={props.category} />
        </Modal.Body>
    </Modal>
  )
}
