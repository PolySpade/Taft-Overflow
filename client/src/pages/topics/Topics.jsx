import React from 'react'

import { Topics_container,Leftsidebar,Rightsidebar } from '../../containers';

import './topics.css';

const Topics = () => {
  return (
    <div className="topics__container-body">
      <Leftsidebar />
      <Topics_container />
      <Rightsidebar />
    </div>
  )
}

export default Topics