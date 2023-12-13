import React, { useState, useEffect } from "react"
import { Formik, Field, Form } from "formik"
import { todoSchema } from "../../utilities/validationSchema"
import axios from "axios"

export default function TodoForm(props) {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`http://todoapi.aliciavillegas.net/api/ToDos`).then((response) => {
            console.log(response)
            setCategories(response.data)
        })
    }, [])

    const handleSubmit = (values) => {
        console.log(values)
        if (!props.todo) {
            const todoToCreate = values

            axios.post(`http://todoapi.aliciavillegas.net/api/ToDos`, todoToCreate).then(() => {
                props.setShowCreate(false)
                props.getToDos()
            })
        } else {
            const todoToEdit = {
                todoId: props.todo.todoId,
                name: values.name,
                url: values.url,
                linkText: values.linkText,
                description: values.description,
                categoryId: values.categoryId,
            }

            axios.put(`http://todoapi.aliciavillegas.net/api/ToDos/${props.todo.todoId}`, todoToEdit).then(() => {
                props.setShowEdit(false)
                props.getToDos()
            })
        }
    }

    return (
        <Formik
            validationSchema={todoSchema}
            initialValues={{
                name: props.todo ? props.todo.name : "",
                description: props.todo ? props.todo.description : "",
                url: props.todo ? props.todo.url : "",
                linkText: props.todo ? props.todo.linkText : "",
                categoryId: props.todo ? props.todo.categoryId : "",
            }}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ errors, touched }) => (
                <Form id='TodoForm'>
                    <div className='form-group m-3'>
                        <Field name='name' placeholder='Name' className='form-control' />
                        {errors.name && touched.name && <div className='text-danger'>{errors.name}</div>}
                    </div>
                    <div className='form-group m-3'>
                        <Field name='url' placeholder='Url' className='form-control' />
                        {errors.url && touched.url && <div className='text-danger'>{errors.url}</div>}
                    </div>
                    <div className='form-group m-3'>
                        <Field name='linkText' placeholder='Link Text' className='form-control' />
                        {errors.linkText && touched.linkText && <div className='text-danger'>{errors.linkText}</div>}
                    </div>
                    <div className='form-group m-3'>
                        <Field
                            name='description'
                            as='textarea'
                            placeholder='Description'
                            className='form-control'
                            style={{ resize: "none", height: "5em" }}
                        />
                        {errors.description && touched.description && <div className='text-danger'>{errors.description}</div>}
                    </div>
                    <div className='form-group m-3'>
                        <Field as='select' name='categoryId' className='form-control'>
                            {/* This first option tag acts as a placeholder for our select list */}
                            <option value='' disabled>
                                [--Please Choose--]
                            </option>
                            {/* Below we will map an option for each category in the API */}
                            {categories.map((cat) => (
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.categoryName}
                                </option>
                            ))}
                        </Field>
                        <div className='form-group m-3'>
                            <button type='submit' className='btn btn-customPurple m-3'>
                                Submit
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    )
}
