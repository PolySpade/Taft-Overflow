import React from 'react'
import './sidebarsection.css';
import announcement from '../../assets/icons/announcement.svg';
const Sidebarsection = () => {
  return (
    <div className='sidebarsection__container'>
      <div className='sidebarsection__header'>
        <img src={announcement}></img>
        <p>Announcement</p>
      </div>
      <div className='sidebarsection__contents'>
        <a href='#'> Test </a>
        <a href='#'> Test </a>
      </div>
    </div>
  )
}

export default Sidebarsection