import React from 'react'
import './sidebarsection.css';
import law from '../../assets/icons/law.svg';
import bullet from '../../assets/icons/bullet.svg';
const Sidebarrule = () => {
  return (
    <div className='sidebarsection__container'>
      <div className='sidebarsection__header'>
        <img src={law}></img>
        <p>Rules</p>
      </div>
      <div className='sidebarsection__contents'>
      <div>
        <img src={bullet} className='sidebarsection__bullet'></img>
        <a href='#'>Test</a>
        <div>
        <img src={bullet} className='sidebarsection__bullet'></img>
        <a href='#'>Test</a>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebarrule