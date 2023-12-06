import React from 'react'

export default function SingleCategory(props) {
  //Below we are destructuring specific properties off of our props.category object
  const {catName, catDesc} = props.category
  return (
    <tr>
      <td>{catName}</td>
      <td>{catDesc}</td>
    </tr>
  )
}