import React from 'react'
import './body.css';
import {Post, Profile_info, Profile_recents, Create_post, Create_postheader, About_us, About_us_header, Privacy_policy, Privacy_policy_header} from '../../components/index';

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
// CREATE POST PAGE
const Body = () => {
  return (
    <div className='body__container section__padding'>
      <About_us_header></About_us_header>
      <div className='body__container-recents'>
        <About_us></About_us>
      </div>
    </div>
  )
}


export default Body