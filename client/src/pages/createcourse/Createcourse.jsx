import React from 'react'

import { Posts_container,Leftsidebar,Rightsidebar, Create_course_container } from '../../containers';

import './createcourse.css';

const Createcourse = ({user}) => {
  return (
    <div className="createcourse__container-body">
      <Leftsidebar />
      <Create_course_container user={user}/>
      <Rightsidebar />
    </div>
  )
}

export default Createcourse