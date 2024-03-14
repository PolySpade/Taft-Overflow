import React from 'react'

import { Posts_container,Leftsidebar,Rightsidebar } from '../../containers';

import './home.css';

const Home = () => {
  return (
    <div className="home__container-body">
      <Leftsidebar />
      <Posts_container />
      <Rightsidebar />
    </div>
  )
}

export default Home