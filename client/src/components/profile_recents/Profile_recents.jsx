import React from 'react'
import './profile_recents.css';
import {Post} from '../index';

const Profile_recents = () => {
  return (
    <div className='profile_recents__container'>
      <p className='profile_recents__container-text'>Recent Posts:</p>
      <div className='profile_recents__container-posts'>
        {/* <Post></Post> */}
      </div>
    </div>
  )
}

export default Profile_recents