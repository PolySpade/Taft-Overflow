import React from 'react'

import { Course_container,Leftsidebar,Rightsidebar } from '../../containers';

import './course.css';

const Course = ({user}) => {
  return (
    <div className="course__container-body">
      <Leftsidebar />
      <Course_container user={user}/>
      <Rightsidebar />
    </div>
  )
}

export default Course