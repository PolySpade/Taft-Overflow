import React from 'react'

import { Bookmarks_container,Leftsidebar,Rightsidebar } from '../../containers';

import './bookmarks.css';

const Bookmarks = () => {
  return (
    <div className="bookmarks__container-body">
      <Leftsidebar />
      <Bookmarks_container />
      <Rightsidebar />
    </div>
  )
}

export default Bookmarks