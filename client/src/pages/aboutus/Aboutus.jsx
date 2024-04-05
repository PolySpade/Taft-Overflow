import React from 'react'

import { Aboutus_container,Leftsidebar,Rightsidebar } from '../../containers';

import './aboutus.css';

const Aboutus = ({user}) => {
  return (
    <div className="course__container-body">
      <Leftsidebar />
      <Aboutus_container user={user}/>
      <Rightsidebar />
    </div>
  )
}

export default Aboutus