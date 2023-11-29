import React from 'react'

export default function SingleCategory(props) {
  //Below we are destructuring specific properties off of our props.category object
  const {categoryName, categoryDescription} = props.category
  return (
    <tr>
      <td>{categoryName}</td>
      <td>{categoryDescription}</td>
    </tr>
  )
}