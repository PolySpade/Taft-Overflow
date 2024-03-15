import React, { useEffect, useState } from 'react';
import './post_full_container.css';
import { Post_full } from '../../components/index';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'

const Post_full_container = () => {
  
  const {id} = useParams();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const delay = 0; 

    const timer = setTimeout(() => {
      axios.get("http://localhost:4000/api/posts")
        .then(res => {
          const FullPost = res.data.filter(
            post => post._id === id);
          setPosts(FullPost);
        }).catch(err => console.log(err));
    }, delay);

    return () => clearTimeout(timer); // Cleanup the timeout on component unmount
  }, [id]);
  
  

  return (
    <div className='post_full_container__container section__padding'>
      {posts[0] && <Post_full contents={posts[0]} />}
    </div>
  );
}

export default Post_full_container;