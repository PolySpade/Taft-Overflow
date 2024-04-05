import './profile_recents.css';
import {Post, RecentComments} from '../index';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Profile_recents = ({user, id}) => {
  const [posts, setPosts] = useState([]);
  const [comments,setComments] = useState([])
  useEffect(() => { 
    axios.get(`${process.env.REACT_APP_API_URL}/api/posts`)
      .then(res => {
        const regularPosts = res.data.filter(post => post.user_id.username === id).sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));
        setPosts(regularPosts);

      }).catch(err => console.log(err));
  }, []);
  const Posts = posts.map((content, index) =>
    <Post user={user} key={index} contents={content}></Post>
  );

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/comments/user/${id}`)
      .then(res => {
        const newcomments = res.data;
        setComments(newcomments);
      }).catch(err => console.log(err));
  }, []);
  const UserComments = comments.length > 0
  ? comments.map((content, index) =>
      <RecentComments user={user} key={index} contents={content}></RecentComments>
    )
  : <p className='profile_recents__container-posts-nothing'>Nothing to see here</p>;
  
  return (
    <div className='profile_recents___container-container'>
    <div className='profile_recents__container'>
      <p className='profile_recents__container-text'>Recent Posts:</p>
      <div className='profile_recents__container-posts'>
        {Posts}
      </div>
    </div>
    <div className='profile_recents__container'>
      <p className='profile_recents__container-text'>Recent Comments:</p>
      <div className='profile_recents__container-posts'>
        {UserComments}
      </div>
    </div>
    </div>
  )
}

export default Profile_recents