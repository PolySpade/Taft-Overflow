import React from 'react'
import './sidebarsection.css';
import members from '../../assets/icons/members.svg';
const Sidebarmembers = () => {
  return (
    <div className='sidebarsection__container'>
      <div className='sidebarsection__header'>
        <img src={members}></img>
        <p>Members</p>
      </div>
      <div className='sidebarsection__contents'>
        <a href='#'> Test </a>
        <a href='#'> Test </a>
      </div>
    </div>
  )
}

export default Sidebarmembers