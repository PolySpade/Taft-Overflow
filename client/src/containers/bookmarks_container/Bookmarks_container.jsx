import React, { useEffect, useState } from 'react'
import './bookmarks_container.css';
import {Post} from '../../components/index';
import axios from 'axios';


const Bookmarks_container = () => {

  const [post,setPosts] = useState([])

  useEffect( () => {
    axios.get("http://localhost:4000/api/posts")
      .then(res => {
        setPosts(res.data.filter(post => post.type === 'regular'))
      }).catch(err=> console.log(err));
  },[]);

  const Bookmarks = post.slice(0,4).map((content, index) =>
    <Post key={index} contents={content}></Post>
  );

  return (
    <div className='bookmarks__container section__padding'>
      <h1>Bookmarks</h1>
      <div className='rectangleline'></div>
      <div className='bookmarks__contents'>
      {Bookmarks}
      </div>
    </div>
  )
}

export default Bookmarks_container