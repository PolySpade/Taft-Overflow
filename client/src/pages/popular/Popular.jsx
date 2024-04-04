import React from 'react'

import { Popular_container,Leftsidebar,Rightsidebar } from '../../containers';

import './popular.css';

const Popular = ({user}) => {
  return (
    <div className="popular__container-body">
      <Leftsidebar />
      <Popular_container user={user} />
      <Rightsidebar />
    </div>
  )
}

export default Popular