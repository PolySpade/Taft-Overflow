import React, { useEffect, useState } from 'react'
import './popular_container.css';
import {Post} from '../../components/index';
import axios from 'axios';


const Popular_container = () => {

  const [post,setPosts] = useState([])

  useEffect( () => {
    axios.get("http://localhost:4000/api/posts")
      .then(res => {
        setPosts(res.data.filter(post => post.type === 'regular'))
      }).catch(err=> console.log(err));
  },[]);

  const Popular = post.slice(0,10).map((content, index) =>
    <Post key={index} contents={content}></Post>
  );

  return (
    <div className='popular__container section__padding'>
      <h1>Popular</h1>
      <div className='rectangleline'></div>
      <div className='popular__contents'>
      {Popular}
      </div>
    </div>
  )
}

export default Popular_container