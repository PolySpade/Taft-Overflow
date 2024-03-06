import React from 'react'
import './sidebarbigbuttons.css';

const Sidebarbigbuttons = ({imgUrl, name, action}) => {
  return (
    <button className='sidebarbigbutton' onClick={action}>
        <img src={imgUrl}></img>
        <p>{name}</p>
    </button>
  )
}

export default Sidebarbigbuttons