import React from 'react'

import { Posts_container,Leftsidebar,Rightsidebar, Create_post_container } from '../../containers';

import './createpost.css';

const Createpost = () => {
  return (
    <div className="createpost__container-body">
      <Leftsidebar />
      <Create_post_container />
      <Rightsidebar />
    </div>
  )
}

export default Createpost