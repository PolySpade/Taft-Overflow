import React from 'react'

import { Profile_container,Leftsidebar,Rightsidebar } from '../../containers';

import './profile.css';

const Profile = () => {
  return (
    <div className="profile__container-body">
      <Leftsidebar />
      <Profile_container />
      <Rightsidebar />
    </div>
  )
}

export default Profile