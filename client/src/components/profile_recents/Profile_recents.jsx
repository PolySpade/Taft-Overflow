import './profile_recents.css';
import {Post} from '../index';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Profile_recents = ({user, id}) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/api/posts")
      .then(res => {
        const regularPosts = res.data.filter(post => post.user_id.username === id).sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));
        setPosts(regularPosts);

      }).catch(err => console.log(err));
  }, []);
  const Posts = posts.map((content, index) =>
    <Post user={user} key={index} contents={content}></Post>
  );
  return (
    <div className='profile_recents__container'>
      <p className='profile_recents__container-text'>Recent Posts:</p>
      <div className='profile_recents__container-posts'>
        {Posts}
      </div>
    </div>
  )
}

export default Profile_recents