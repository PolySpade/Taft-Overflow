import React from 'react'
import './sidebarsection.css';
import law from '../../assets/icons/law.svg';
const Sidebarrule = () => {
  return (
    <div className='sidebarsection__container'>
      <div className='sidebarsection__header'>
        <img src={law}></img>
        <p>Rules</p>
      </div>
      <div className='sidebarsection__contents'>
        <a href='#'> Test </a>
        <a href='#'> Test </a>
      </div>
    </div>
  )
}

export default Sidebarrule