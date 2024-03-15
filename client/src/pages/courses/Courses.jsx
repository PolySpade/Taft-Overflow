import React from 'react'

import { Courses_container,Leftsidebar,Rightsidebar } from '../../containers';

import './courses.css';

const Courses = () => {
  return (
    <div className="courses__container-body">
      <Leftsidebar />
      <Courses_container />
      <Rightsidebar />
    </div>
  )
}

export default Courses