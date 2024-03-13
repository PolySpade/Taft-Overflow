import React from 'react'
import './body.css';
import {Post, Profile_info, Profile_recents, Create_post, Create_postheader} from '../../components/index';

/* PROFILE PAGE
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
*/
//* CREATE POST PAGE
const Body = () => {
  return (
    <div className='body__container section__padding'>
      <Create_postheader></Create_postheader>
      <div className='body__container-recents'>
        <Create_post></Create_post>
      </div>
    </div>
  )
}

export default Body