import React from 'react'

import { Posts_container,Leftsidebar,Rightsidebar, Create_post_container } from '../../containers';

import './createpost.css';

const Createpost = ({user}) => {
  return (
    <div className="createpost__container-body">
      <Leftsidebar />
      <Create_post_container user={user}/>
      <Rightsidebar />
    </div>
  )
}

export default Createpost