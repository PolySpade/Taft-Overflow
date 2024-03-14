import React from 'react'

import { Topic_container,Leftsidebar,Rightsidebar } from '../../containers';

import './topic.css';

const Topic = () => {
  return (
    <div className="topic__container-body">
      <Leftsidebar />
      <Topic_container />
      <Rightsidebar />
    </div>
  )
}

export default Topic