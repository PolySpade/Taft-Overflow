import React from 'react'
import './sidebarsection.css';
import announcement from '../../assets/icons/announcement.svg';
import {Link} from 'react-router-dom';


const Sidebarsection = ({header,icon}) => {
  return (
    <div className='sidebarsection__container'>
      <div className='sidebarsection__header'>
        <img src={icon}></img>
        <p>{header}</p>
      </div>
      <div className='sidebarsection__contents'>
        <Link href='#'> Test </Link>
      </div>
    </div>
  )
}

export default Sidebarsection