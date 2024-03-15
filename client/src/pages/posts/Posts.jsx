import React from 'react'

import { Posts_container,Leftsidebar,Rightsidebar } from '../../containers';

import './posts.css';

const Posts = () => {
  return (
    <div className="posts__container-body">
      <Leftsidebar />
      <Posts_container />
      <Rightsidebar />
    </div>
  )
}

export default Posts