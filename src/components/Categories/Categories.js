//useState imported for storing categories from the API, useEffect to automate the API call
import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
//imported axios after running "npm install axios"
import axios from 'axios'
import SingleCategory from './SingleCategory'

//Below imports are for create functionality:
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate'

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the categories
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)

//Steps to Create functionality
//1. Create validationSchema and form specific to Categories
//2. import currentUser from the context
//3. Create a react hook to show/hide the form
//4. Create and render CatCreate in the conditonal rendering, based on whether the user is an admin or not
//5. Update the create functionality in CatForm.js

export default function Categories() {
  //the hook below will store the Categories data returned by the API
  const [categories, setCategories] = useState([])

  //The two hooks below are for create functionality
  const { currentUser } = useAuth()
  //This React hook below will track the state of whether the Create form is showing/hidden
  const [showCreate, setShowCreate] = useState(false)

  //below we write the hook to get our categories from the API using axios
  const getCategories = () => {
    axios.get(`https://todoapi.aliciavillegas.net/api/ToDos`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <section className="categories">
      <article className="bg-info p-5">
        <h1 className="text-center">Categories Dashboard</h1>
      </article>
      {/* CREATE UI - this is only shown to the ADMIN! */}
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center">
          {showCreate ? 
            <>
              <button onClick={() => setShowCreate(false)} className="btn btn-warning">
                Cancel
              </button>
              <CatCreate getCategories={getCategories} setShowCreate={setShowCreate} />
            </> :
            <button onClick={() => setShowCreate(true)} className="btn btn-info">
              Create Category
            </button>
          }
        </div>
      }
      {/* END CREATE UI */}
      <Container className="p-2">
        <table className="table bg-info table-dark my-3">
          <thead className="table-secondary text-uppercase">
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {/* READ UI */}
            {categories.map(c =>
              <SingleCategory key={c.categoryId} category={c} />
            )}
          </tbody>
        </table>
      </Container>
    </section>
  )
}