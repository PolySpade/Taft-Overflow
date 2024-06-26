import React from 'react'

import { Post_full_container,Leftsidebar,Rightsidebar } from '../../containers';

import './post.css';

const Post = ( {user}) => {
  return (
    <div className="post__container-body">
      <Leftsidebar />
      <Post_full_container user={user}/>
      <Rightsidebar />
    </div>
  )
}

export default Post