import React, { useEffect, useState} from 'react'
import './topic_container.css';
import {Post} from '../../components/index';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'


const Topic_container = () => {

  const {id} = useParams();
  const [posts,setPosts] = useState([])

  useEffect( () => {
    axios.get("http://localhost:4000/api/posts")
      .then(res => {
        const filteredPosts = res.data.filter(post => 
          post.type === 'regular' && post.topic_ids.some(topic => topic.name === id)
        );
        setPosts(filteredPosts);
      }).catch(err=> console.log(err));
  },[id]);

  const Posts = posts.slice(0,10).map((content, index) => 
    <Post contents={content}></Post>
  );
  
  return (
    <div className='topic__container section__padding'>
      <div className='topic__header-container'><div className='topic__header-header'>Topic:</div><div className='topic__header-tag'>{id}</div></div>
      
      <div className='rectangleline'></div>
      <div className='topic__contents'>
      {Posts}
      </div>
    </div>
  )
}

export default Topic_container