import React from 'react'
import './body.css';
import {Post, Profile_info, Profile_recents} from '../../components/index';


const Body = () => {
  return (
    <div className='body__container section__padding'>
      <Profile_info></Profile_info>
      <div className='body__container-recents'>
      <Profile_recents></Profile_recents>
      <Profile_recents></Profile_recents>
      </div>
    </div>

  )
}

export default Body