import React from 'react'
//Below are the three components ffrom Formik we need to build our form. We already istalled using 'npm install formik'
import { Formik, Form, Field } from "formik"
import { catSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.category) {
            // If there is no prop for "category", we are in create mode inside this scope. First we assemble a temp object to send in our request
            const catToCreate = values

            //Second we send the object in a post request using axios
            axios.post(`http://todoapi.aliciavillegas.net/api/categories/`, catToCreate).then(() => {
                props.setShowCreate(false)//this will close the create form
                props.getCategories()//This will refresh the table of categories to include the new one
            })
        } else {
            // If there is a prop for "category", we are in edit mode inside this scope. First, we assemble our temo object, adding hte categoryId
            const catToEdit = {
                categoryId: props.category.categoryId,
                categoryName: values.categoryName,
                categoryDescription: values.categoryDescription
            }
            axios.put(`http://todoapi.aliciavillegas.net/api/categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.setShowEdit(false)
                props.getCategories()
            })
        }
    }

  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik 
            validationSchema={catSchema}
            initialValues={
               //Below is a ternary operator that makes our form behave differently based on whether we have a prop called category. (ie Editing a category)
               {
                    categoryName: props.category ? props.categoryName : '',
                    categoryDescription: props.category ? props.category.categoryDescription : ''
               }}
               onSubmit={values => handleSubmit(values)}>
            {({errors, touched}) => (
                //Our form will go here
                <Form id='catForm' className='row text-center m-auto'>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryName' className='form-control' placeholder='Name'  />
                        {/* Below is the conditionally rendered error mesage */}
                        {errors.categoryName && touched.categoryName && 
                            <div className="text-danger">{errors.categoryName}</div>
                        }
                    </div>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryDescription' className='form-control' placeholder='Description'  />
                        {/* Below is the conditionally rendered error mesage */}
                        {errors.categoryDescription && touched.categoryDescription && 
                            <div className="text-danger">{errors.categoryDescription}</div>
                        }
                    </div>
                    <div className="form-group m-1">
                        <button type='submit' className="btn btn-success">
                            Submit Category to API
                        </button>
                    </div>
                </Form>
            )}
        </Formik>

    </div>
  )
}
