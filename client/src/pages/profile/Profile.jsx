import React from 'react'

import { Profile_container,Leftsidebar,Rightsidebar } from '../../containers';

import './profile.css';

const Profile = ({user}) => {
  return (
    <div className="profile__container-body">
      <Leftsidebar />
      <Profile_container user={user}/>
      <Rightsidebar />
    </div>
  )
}

export default Profile