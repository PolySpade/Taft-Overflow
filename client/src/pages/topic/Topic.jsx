import React from 'react'

import { Topic_container,Leftsidebar,Rightsidebar } from '../../containers';

import './topic.css';

const Topic = ({user}) => {
  return (
    <div className="topic__container-body">
      <Leftsidebar />
      <Topic_container user={user}/>
      <Rightsidebar />
    </div>
  )
}

export default Topic