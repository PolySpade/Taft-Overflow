import React from 'react'
import './sidebarsection.css';
import members from '../../assets/icons/members.svg';
import bullet from '../../assets/icons/bullet.svg';
const Sidebarmembers = () => {
  return (
    <div className='sidebarsection__container'>
      <div className='sidebarsection__header'>
        <img src={members} alt='Members'></img>
        <p>Members</p>
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

export default Sidebarmembers