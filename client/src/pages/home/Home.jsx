import React from 'react'

import { Posts_container,Leftsidebar,Rightsidebar } from '../../containers';

import './home.css';

const Home = ({user}) => {
  return (
    <div className="home__container-body">
      <Leftsidebar />
      <Posts_container user={user}/>
      <Rightsidebar />
    </div>
  )
}

export default Home