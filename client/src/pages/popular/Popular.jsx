import React from 'react'

import { Popular_container,Leftsidebar,Rightsidebar } from '../../containers';

import './popular.css';

const Popular = () => {
  return (
    <div className="popular__container-body">
      <Leftsidebar />
      <Popular_container />
      <Rightsidebar />
    </div>
  )
}

export default Popular