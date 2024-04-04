import React, { useEffect, useState }  from 'react'
import './post.css';
import {profile,dropdown, upvote_highlight,downvote_highlight,downvote_none,upvote_none} from './imports';
import study from '../../assets/images/study.jpg';
import {Link} from 'react-router-dom';
import axios from 'axios';

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}



const Post = ({user,contents}) => {
  const user_id = contents.user_id;
  const post_id = contents._id;
  const title = contents.title;
  const content = contents.content;
  const date = formatDate(contents.entryDate);
  const course_ids = contents.course_id;
  const username = contents.user_id.username;
  const profile_image = contents.user_id.profile_img;
  const type = contents.type;
  const topic_ids = contents.topic_ids;

  const [upvote,setUpvote] = useState([])
  const [downvote,setDownvote] = useState([])


  const fetchVotes = () => {
    axios.get(`http://localhost:4000/api/vote/${post_id}`)
      .then(res => {
        const { upvote, downvote } = res.data;
        setUpvote(upvote);
        setDownvote(downvote);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchVotes();
  }, [post_id]);


  const query_tags = topic_ids.map((content, index) => 
    <Link key={index} to={'/topics/'+content.name}>{'#'+content.name}</Link>
  );
  
  const vote = (like_type) => {
    const formData = {
      postId: post_id,
      userId: user._id,
      voteType: like_type
    };
    //console.log(formData);
    axios.post(`http://localhost:4000/api/vote`, formData)
      .then(res => {
        //console.log(res.data);
        fetchVotes(); //refresh
      })
      .catch(err => console.log(err));
  };
  
  const handleUpvote = () => vote(1);
  const handleDownvote = () => vote(-1);


  return (
    <div className='post__container'>
      <div className='post__header'>
        <div className='post__footer'>
          <div className='post__footer-tags'>
            {query_tags}
          </div>
          <Link className='post__footer-view' to={'/posts/'+ post_id}>
            <img src={dropdown}></img>
            <p>View more</p>
          </Link>
          <div className='post__footer-date'>
            <p>{date}</p>
          </div>
        </div>

        <div className='post__profile'>
          <div className='post__profile-image'>
            <img src={profile_image} alt='profile'/>
          </div>
          <div className='post__profile-name'>
            <Link to={'/profile/'+username}>{username}</Link>
          </div>
        </div>
        <div className='post__location'>
          <p>Posted in </p>
          <Link to={'/courses/'+ course_ids.name}>c/{course_ids.name}</Link>
        </div>
        <div className='post__votes'>
          <button className='post__votes-upvote' onClick={user && handleUpvote}><img src={upvote_none} alt='upvote'></img></button>
          <p>{upvote}</p>
          <button className='post__votes-downvote' onClick={user && handleDownvote}><img src={downvote_none} alt='downvote'></img></button>
          <p>{downvote}</p>
        </div>
      </div>
      <div className='post__content'>
        <p>{content}</p>
      </div>
    </div>

    
  )
}

export default Post