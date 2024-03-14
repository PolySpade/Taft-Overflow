import React from 'react'
import './sidebarbigbuttons.css';
import {Link} from 'react-router-dom'

const Sidebarbigbuttons = ({imgUrl, name, action}) => {
  return (
    <Link className='sidebarbigbutton' to={action}>
        <img src={imgUrl}></img>
        <p>{name}</p>
    </Link>
  )
}

export default Sidebarbigbuttons