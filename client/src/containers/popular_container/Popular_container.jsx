import React, { useEffect, useState } from 'react'
import './popular_container.css';
import {Post} from '../../components/index';
import axios from 'axios';


const Popular_container = ({user}) => {

  const [post,setPosts] = useState([])

  // useEffect(() => {
  //   axios.get(`${process.env.REACT_APP_API_URL}/api/posts`)
  //     .then(res => {
  //       const regularPosts = res.data.filter(post => post.type === 'regular');
  //       setPosts(regularPosts);
  //     }).catch(err => console.log(err));
  // }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/posts`)
      .then(async res => {
        const regularPosts = res.data.filter(post => post.type === 'regular');

        const postsWithVotes = await Promise.all(regularPosts.map(async post => {
          const voteRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/vote/${post._id}`);
          return { ...post, upvote: voteRes.data.upvote, downvote: voteRes.data.downvote };
        }));

        // Sort posts based on upvote count in descending order
        const sortedPosts = postsWithVotes.sort((a, b) => (b.upvote+b.downvote) - (a.upvote+b.downvote));

        setPosts(sortedPosts.slice(0, 10)); // Update state with top 10 posts
      })
      .catch(err => console.log(err));
  }, []);

  const Popular = post.slice(0,10).map((content, index) =>
    <Post user={user} key={index} contents={content}></Post>
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