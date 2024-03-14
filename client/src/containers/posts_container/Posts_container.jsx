import React, { useEffect, useState } from 'react'
import './posts_container.css';
import {Post} from '../../components/index';
import axios from 'axios';


const Posts_container = () => {

  const [posts,setPosts] = useState([])

  useEffect( () => {
    axios.get("http://localhost:4000/api/posts")
      .then(res => {
        setPosts(res.data.filter(post => post.type === 'regular'))
      }).catch(err=> console.log(err));
  },[]);

  const Posts = posts.slice(0,2).map((content, index) =>
    <Post contents={content}></Post>
  );

  return (
    <div className='posts__container section__padding'>
      {Posts}
    </div>
  )
}

export default Posts_container